const loadImage = 10;


let getImagesVar = false;
async function getImages() {
    if (getImagesVar) return
    const URL = `https://picsum.photos/v2/list`;
    const res = await fetch(URL);
    const resJosn = await res.json();
    resJosn.map((item, i) => {
        if (loadImage <= i) return
        document.querySelector('.icon--image').insertAdjacentHTML('beforeend', `<div>
        <img src="${item.download_url}" alt="${item.author}" class="img-fluid shapeImage">
    </div>`)
    })
    getImagesVar = true;
}

document.querySelector('.laodMoreImage').addEventListener('click', function () {
    loadImage += 10;
    getImagesVar = false;
    getImages()
})
let iconsLoadVar = false;
function iconsLoad(providor) {
    if (iconsLoadVar) return
    const imageNames = [
        { alt: `insta image`, url: `assets/images/social/insta.png` },
        { alt: `facebook image`, url: `assets/images/social/facebook.png` },
        { alt: `youtube image`, url: `assets/images/social/youtube.png` },
        { alt: `share image`, url: `assets/images/social/share.png` }]


    imageNames.map(image => {
        document.querySelector(providor).insertAdjacentHTML('beforeend', `<div>
            <img src="${image.url}" class="img-fluid iconsImage" alt="${image.alt}">
        </div>`)
    })
    iconsLoadVar = true;
}


export { getImages, iconsLoad }