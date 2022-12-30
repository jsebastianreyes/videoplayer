//Funcionalidad Botones 

const $video = document.querySelector('#video')
const $play = document.querySelector('#play')
const $btnForward = document.querySelector('#forward')
const $btnBack = document.querySelector('#back')
const $progress = document.querySelector('#progress')
const status = $video.dataset.play

async function playAndPause(e){
  if($video.dataset.play === 'false'){
    $video.dataset.play = 'true'
    $video.play()
    const time = await timeUpdate()
  }
  else{
    $video.dataset.play = 'false'
    $video.pause()
  }
}

function timeUpdate(){
  return new Promise((resolve, reject) => {
    $video.addEventListener("timeupdate",function(ev){
      let position = $video.currentTime; // posicion actual 
      let max = $video.duration; 

      $progress.setAttribute('max', max)
      $progress.value = position
      $progress.dataset.time = $video.currentTime % 60
      resolve($video.currentTime % 60)
     },true);
  })
}


$progress.addEventListener('pointermove', handlerTimeVideo)
$progress.addEventListener('pointerup', handlerTime)

function handlerTimeVideo(e){
  // $video.pause()
}
function handlerTime(e){
  $video.currentTime = $progress.value
  // $video.play()
}

$btnForward.addEventListener('click', async ()=> {
    const time = await timeUpdate()
    $video.currentTime = time + 3
})

$btnBack.addEventListener('click', async ()=> {
  const time = await timeUpdate()
  $video.currentTime = time - 3
})

$play.addEventListener('click', playAndPause)
