import Head from 'next/head'
import React, {useRef, useState} from 'react'
import CheckAuth from './check_auth'
import { BannerPost } from '../../client/components/Banner'
import { ButtonCustom } from '../../client/components/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons'
import FaLoading from '../../client/components/Loader'
import Spinner from 'react-spinner-material'

const manage_assets = ()=> {

    const [refresh, setRefresh] = useState(true);
    const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Manage Assets | Code Grabber</title>
            </Head>

            <CheckAuth />

            <BannerPost 
                title='Manage Assets'
                img="/Assets/upload.webp"
            />

            <ManageAssetSection
                refresh={refresh}
                setRefresh={setRefresh}
                openAddAsset={()=>setAddAssetModalOpen(true)}
            />

            <AddAssetModal
                open={addAssetModalOpen}
                setOpen={setAddAssetModalOpen}
                refresh={()=> setRefresh(!refresh)}
            />

        </>
    )
}

export default manage_assets


const AddAssetModal = ({ open, setOpen, refresh }) => {

    const previewUploadRef = useRef(null)
    const [controller, setController] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imgUrl, setImgUrl] = useState("Image url")

    const copyImgUrl = ()=> {
        navigator.clipboard.writeText(imgUrl);
    }

    const handleChange = (e) => {
        if (!e.target.files) return
        if (!previewUploadRef.current) return

        setSelectedImage(e.target.files[0])

        previewUploadRef.current.src = URL.createObjectURL(e.target.files[0]);
    }

    const handleUpload = ()=> {
        if (!selectedImage) return

        const newController = new AbortController()
        setController(newController)

        const formData = new FormData();
        formData.append("file", selectedImage);

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
        }
        
        fetch(`/api/assets/addasset`, {
            method: "POST",
            body: formData,
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            setImgUrl(window.location.protocol + "//" + window.location.host + data);
            setController(null);
            refresh();
            // console.log(data);
        })
    }


    

    return open ? (
        <div className='absolute top-0 bottom-0 w-screen h-screen bg-cdek-black bg-opacity-70 grid place-content-center'>
            <button 
                className="absolute top-12 right-4 w-6 h-6 text-3xl text-white text-opacity-50 hover:text-opacity-100 transition-colors"
                onClick={e=>{
                    setImgUrl("Image Url")
                    setOpen(false)
                }} 
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="bg-white p-4 w-96">
                <input className="w-full p-2 border" type="file" onChange={handleChange} />
                <img className="w-full my-2" ref={previewUploadRef} src="/Assets/upload.webp" alt="preview" />
                {
                    controller ? <div className="p-2 text-blue-600">
                        <button className="border border-blue-600 p-2 text-blue-600"><FaLoading/></button>
                        <button onClick={()=>controller.abort()} className="border border-blue-600 p-2 text-blue-600">Cancel</button>
                    </div>
                    : <button onClick={handleUpload} className="border border-blue-600 p-2 text-blue-600">Submit</button>
                }
                <span className='block bg-cdek-black text-cdek-aqua rounded-md my-2 p-2' onClick={copyImgUrl} >{imgUrl}</span>

            </div>
        </div>
    ) : <></>
}

const ManageAssetSection = ({refresh, setRefresh, openAddAsset}) => {
    const deleteAsset = async (filename) => {

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
        }

        const response = await fetch(`/api/assets/deleteasset/${filename}`, {
            method: "DELETE",
            headers: headersList
        })
        
        if (response.status !== 200) {
            const data = await response.text();

            alert(data)
        }
    }

    const [userAssets, setUserAssets] = React.useState([]);

    React.useEffect(() => {
        if ( typeof document !== "undefined" ) {
            setUserAssets(null)

            let headersList = {
                "Accept": "*/*",
                "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
            }
    
            fetch(`/api/assets/get-user-assets`, {
                method: "GET",
                headers: headersList
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                setUserAssets(data.assets);
                // console.log(data);
            })
        }
    }, [refresh])


    return (
        <>
            <div className='flex justify-start items-center'>
                <h1 className='text-2xl my-5 mx-5 font-bold'>Manage the Assets from the database 📁</h1>
                <button onClick={()=>setRefresh(!refresh)} className='my-2 h-8 w-8'>
                    <FontAwesomeIcon color="black" className='h-full w-full' icon={faRefresh} />
                </button>
            </div>
            <hr />

            <div>
                <div className='flex flex-wrap'>
                    {
                        !userAssets ? 
                            <Spinner color='purple' height={32} className='m-4' />
                        : userAssets.map((asset, index) => {
                            return (
                                <div key={index} className='m-2 p-2 border rounded-md w-64'>
                                    <img className='block w-full' src={asset.imgUrl} alt={asset.filename} />
                                    <p className='text-center my-2 font-semibold truncate'>{asset.filename}</p>
                                    <div className='flex justify-between'>
                                        <ButtonCustom 
                                            color={"cdek-black"}
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(window.location.protocol + "//" + window.location.host + asset.imgUrl);
                                                e.target.innerText = "Copied..!"
                                                setTimeout(() => {
                                                    e.target.innerText = "Copy Url"
                                                }, 1000)
                                            }}
                                        >
                                            Copy Url
                                        </ButtonCustom>
                                        <ButtonCustom 
                                            color={"cdek-blue"}
                                            onClick={async () => {
                                                await deleteAsset(asset.filename)
                                                setRefresh(!refresh);
                                            }}
                                        >
                                            Delete Asset
                                        </ButtonCustom>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='m-4'>
                    <ButtonCustom
                        color={"cdek-blue"}
                        onClick={openAddAsset}
                    >
                        Add Asset
                    </ButtonCustom>
                </div>
            </div>
        </>
    )
}

