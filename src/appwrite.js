import { Client,Databases,ID,Query } from "appwrite";
const project_id = import.meta.env.VITE_APPWRITE_APP_ID;
const db_id = import.meta.env.VITE_APPWRITE_DB_ID;
const collection_id = import.meta.env.VITE_APPWRITE_DB_COLLECTION_ID;
// to get access to appwrite sdk
const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject(project_id);
const db = new Databases(client);

export const updateSerchCount = async(searchTerm,movie)=>{
    try{
        const res = await db.listDocuments(db_id,collection_id,[Query.equal('searchTerm',searchTerm)]);
        if (res.documents.length > 0){
            const doc = res.documents[0];
            await db.updateDocument(db_id,collection_id,doc.$id,{count:doc.count +1});
        }
        else{
            await db.createDocument(db_id,collection_id,ID.unique(),{count:1,movie_id: movie.id,searchTerm: searchTerm,poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`});


        }


    }
    catch(error){
        console.error(error)

    }

};

export const getTrendingMovies = async()=>{
    try{
        const res = await db.listDocuments(db_id,collection_id,[Query.limit(5),Query.orderDesc('count')]);
        return res.documents;

    } 

    catch(error){
        console.error(error);

    }

}