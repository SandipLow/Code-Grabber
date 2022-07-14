import Head from 'next/head'
import React from 'react'
import CheckAuth from './check_auth'

const addasset = () => {

    return (
        <>
            <Head>
                <title>Manage Assets | Code Grabber</title>
            </Head>

            <CheckAuth />

            <AddAssetSection />
            <DeleteAssetSection />

        </>
    )
}

export default addasset


const AddAssetSection = () => {

    const addAsset = (e) => {
        e.preventDefault();

        let fileElement = document.getElementById('upload_img_form')

        // check if user had selected a file
        if (fileElement.files.length === 0) {
            alert('please choose a file');
            return
        }

        document.getElementById("upload_response").innerText = "uploading";

        let file = fileElement.files[0];

        let headersList = {
            "Accept": "*/*",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU0OTE5MzgxfQ.o3taNcm6SCJtPC3Bn1E2-8yCMJjDRHbnTBrW_za_qgg"
        }

        let formdata = new FormData();
        formdata.set("file", file);

        fetch("http://localhost:5000/api/assets/addasset", {
            method: "POST",
            body: formdata,
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            document.getElementById("upload_response").innerText = data;
            // console.log(data);
        })
    }

    const loadFile = (e) => {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(e.target.files[0]);
    }


    return (
        <>
            <div className='flex'>
                <h1 className='text-2xl my-5 mx-5 font-bold'>Upload Asset to the Database 📁</h1>
            </div><hr />

            <center>
                <div className='m-10 rounded cursor-pointer border-gray-50 border-2' style={{ "width": "fit-content" }}>
                    <img id='output' className=' w-full max-w-md' src="/Assets/upload.webp" alt="upload_image" />
                </div>

                <input type="file" id="upload_img_form" name="img" onChange={loadFile} ></input>
                <button onClick={addAsset} className="bg-purple-800 text-yellow-100 p-2 my-4 ml-12 rounded transition hover:bg-purple-900">Upload</button><br />
                <p className=' font-semibold bg-gray-800 p-4 my-4 rounded' style={{ "width": "fit-content" }} id='upload_response'>Image url</p>
            </center>
        </>
    )
}

const DeleteAssetSection = () => {
    const deleteAsset = (e) => {
        e.preventDefault();

        if(document.getElementById("image_url_to_be_deleted").value == "") {
            document.getElementById("delete_op_result").innerText = "Enter url";
            return
        }

        let headersList = {
            "Accept": "*/*",
            "auth-token": localStorage.getItem("auth-token")
        }

        fetch(`http://localhost:5000/api/assets/deleteasset/${document.getElementById("image_url_to_be_deleted").value}`, {
            method: "DELETE",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            document.getElementById("delete_op_result").innerText = data;
            // console.log(data);
        })
    }

    return (
        <>
            <hr className=' mt-32' /><div className='flex'>
                <h1 className='text-2xl my-5 mx-5 font-bold'>Delete Asset from the database 🗑️</h1>
            </div><hr />

            <div>
                <label className=' mx-4' htmlFor="image_url_to_be_deleted">Enter The Image url you want to delete : </label>
                <input className=' m-2 h-12 w-96 bg-gray-800 text-yellow-50 rounded' type="text" id='image_url_to_be_deleted' />
                <button onClick={deleteAsset} className="bg-purple-800 text-yellow-100 p-2 my-4 rounded transition hover:bg-purple-900">Delete</button>
                <span id="delete_op_result" className=' text-green-400 text-sm mx-4' style={{ "width": "fit-content" }}></span>
            </div>
        </>
    )
}

