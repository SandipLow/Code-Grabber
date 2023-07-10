import { getUser } from "./user"

/**
 * Maps the blogs array to add user details and likes count
 * @param {Array} blogs Blogs Array that need to be mapped
 * @param {boolean} userReq If user details are required
 * @returns Promise of mapped blogs
 */
export const blogMapper = (blogs, userReq=true) => {

    return Promise.all(blogs.map(async(blog)=>{
        let user

        if (userReq) {
            let userDetails = await getUser(blog.user)
            user = {
                displayName: userDetails.displayName,
                profilePic: userDetails.profilePic,
            }
        }

        return {
            ...blog._doc,
            likes: blog._doc.likes? blog._doc.likes.length : 0,
            user
        }
    }))
}