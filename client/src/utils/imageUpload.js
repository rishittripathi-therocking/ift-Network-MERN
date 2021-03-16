export const checkImage = (file) => {
    let err = "";
    if(!file) return err="File does not Exists";
    if(file.size>1024*1024*2)
        err = "The largest image size is 2mb"
    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image can only be of format png/jpeg";
    return err;
}

export const imageUpload = async(images) => {
    let imageArr = [];
    for(const item of images) {
        const formData = new FormData();
        formData.append("file",item);
        formData.append("upload_preset","bm3rnt5m")
        formData.append("cloud_name","dbmzgvytx")

        const res = await fetch("https://api.cloudinary.com/v1_1/dbmzgvytx/image/upload",{
            method: 'POST',
            body: formData
        })

        const data = await res.json();
        imageArr.push({public_id: data.public_id, url:data.secure_url})
        
    }
    return imageArr;
}