import { router } from "../router/router.js";
export {loginSupabase, fileRequest, getFileRequest, signUpSupabase , logoutSupabase, getFiltro, buscarPerfil, añadir, addGame, deleteGame, getButtonValue};

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRraGtsc3hjY3ltdWx1bXhrYW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyNzg2NDEsImV4cCI6MTk5ODg1NDY0MX0.5Hlvp_3VdMn8yJh6nRkQbXaA5XvZyf-I-I9hIN1mG70";
const urlBase = "https://tkhklsxccymulumxkaoy.supabase.co";
const headers = {
    "apiKey": SUPABASE_KEY,
    "Content-Type": "application/json",
};


async function supaRequest(url,method,headers,body){
    let response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify(body)  
    });
    if(response.status >=200 && response.status <=300){ 
        if(response.headers.get("content-type")){ 
            return await response.json();
        }
        return {}; 
    }
    else{
        return Promise.reject(await response.json()); 
    }
}


async function fileRequest(url,body,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
        "x-upsert": true
    }; 
    let response = await fetch(`${urlBase}${url}`,{
        method: 'POST',
        headers: headersFile,
        body
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.json();  
            datos.urlAvatar = `${urlBase}${url}`;  
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function getFileRequest(url,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
    }; 
    let response = await fetch(`${url}`,{
        method: 'GET',
        headers: headersFile,
        
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.blob();
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function loginSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/token?grant_type=password`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    console.log(data);
    return data;
}

async function signUpSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/signup`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function logoutSupabase(token){ 
    let url = `${urlBase}/auth/v1/logout`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'post',headersAux,{});
    return data;
}

async function getFiltro(URI,token){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'get',headersAux);
    
    return data;
}

async function buscarPerfil(URI,token) {
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'get',headersAux);
    return data[0];
}

async function añadir(URI,data) {
    let url = `${urlBase}/rest/v1/${URI}`;
    let response = await supaRequest(url,'PATCH',headers,data);
    return response;
}

async function addGame(URI, data, token) {
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let response = await supaRequest(url,'post', headersAux, data);
    return response;
}

async function deleteGame(URI, token) {
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let response = await supaRequest(url,'delete', headersAux);
    window.location.hash = '#/perfil';
    return response;
}

async function getButtonValue(URI, token) {
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let response = await supaRequest(url,'get', headersAux);
    return response;
}