import conf from "../conf/conf";
import { Client, Storage, Query, ID, TablesDB, } from "appwrite";


export class Service {
  client = new Client();
  tables
  bucket;


  constructor() {

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tables = new TablesDB(this.client)
    this.bucket = new Storage(this.client)

  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.tables.createRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userID
        }
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }



  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tables.updateRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status
        }
      }
      )
    } catch (error) {
      console.error("Error updating post:", error);
    }

  }


  async deletePost(slug) {
    try {
      await this.tables.deleteRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: slug
      });
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false
    }

  }


  async getPost(slug) {

    try {
      return await this.tables.getRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: slug
      })
    } catch (error) {
      console.error("Error Fetching post:", error);
    }

  }


  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tables.listRows({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        queries: queries


      })
    } catch (error) {
      console.log("Error fetching posts:", error)
      return [];
    }

  }







  // File upload services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file
      })
    } catch (error) {
      console.log("upload file error", error)
      return false;

    }

  }


  async deletFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      })
      return true;
    } catch (error) {
      console.log("delet file error", error)
      return false;
    }
  }





  // getFilePreview(fileId){
    
  //   return this.bucket.getFilePreview({
  //     bucketId:conf.appwriteBucketId,
  //     fileId:fileId
  //   })


  // }

getFileView(fileId) {
  return this.bucket.getFileView({
    bucketId: conf.appwriteBucketId,
    fileId: fileId
  });
}


  







}


const service = new Service();
export default service

