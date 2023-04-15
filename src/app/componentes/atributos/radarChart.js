
function radarChart()
{
    let radar = document.querySelector(".radarStyle");
    let stats = [];

    for(let i = 0; i < 5; i++)
    {
        stats.push(Math.floor(Math.random() * 9) + 2);
    }

    let fuerza = (55 - (stats[0] * 5.5))+"%"; //ONLY IN Y COORD
    console.log("FUERZA:"+ fuerza)
    let destrezaX = (50 + (stats[1] * 5))+"%" //X COORD
    console.log("DESTREZAX: "+destrezaX)
    let destrezaY = (55 - (stats[1] * 1.7))+"%" //X COORD
    console.log("DESTREZAY: "+destrezaY)

    let vidaX = (50 - (stats[2] * 5))+"%" //X COORD
    console.log("VIDAX: "+vidaX)
    let vidaY = (55 - (stats[2] * 1.7))+"%" //X COORD
    console.log("VIDAY: "+vidaY)

    let tecX = (50 - (stats[3] * 3.2))+"%" //X COORD
    console.log("TECX: "+tecX)
    let tecY = (55 + (stats[3] * 4.5))+"%" //X COORD
    console.log("TECY: "+tecY)

    let rangoX = (50 + (stats[4] * 3.2))+"%" //X COORD
    console.log("TECX: "+rangoX)
    let rangoY = (55 + (stats[4] * 4.5))+"%" //X COORD
    console.log("TECY: "+rangoY)

    console.log(stats);
    radar.style.clipPath = "polygon(50% "+fuerza+", "+destrezaX+" "+destrezaY+", "+rangoX+" "+rangoY+", "+tecX+" "+tecY+", "+vidaX+" "+vidaY+")";
}
