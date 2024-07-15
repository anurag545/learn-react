
const checkElementOverlap = (prevCordinate, currCordinate) => {
    const collide = !(prevCordinate.left > currCordinate.right || prevCordinate.right < currCordinate.left || prevCordinate.bottom < currCordinate.top || prevCordinate.top > currCordinate.bottom || currCordinate.top < 0 || currCordinate.left < 0);
    return collide;
}
export default checkElementOverlap;