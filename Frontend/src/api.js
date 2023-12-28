const APIURL = process.env.REACT_APP_API_URLS;

export const getImages = async (more) => {
    const params=new URLSearchParams()
    if(more)
    {
        params.append('next_cursor',more)
    }
    const response= await fetch(`${APIURL}/photoslist?${params.toString()}`);
    const responsedata=await response.json();
     return responsedata;
};

export const searchImages = async(search,more) =>{
      const params=new URLSearchParams();
      params.append('expression',search)
      if(more){
        params.append('next_cursor',more)
      }
      const response= await fetch(`${APIURL}/search?${params.toString()}`);
      const responsedata=await response.json();
     return responsedata;
}
