export const checkImage = (file) => {
    let err = "";
    if(!file) return err="File does not Exists";
    if(file.size>1024*1024*2)
        err = "The largest image size is 2mb"
    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image can only be of format png/jpeg";
    return err;
}