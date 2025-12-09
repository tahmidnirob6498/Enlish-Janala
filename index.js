function displayLevel(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>setCatagories(data.data))
}
const removeActive=()=>{
const removeAll=document.getElementsByClassName("removeActive")
for(let removeSingle of removeAll){
  removeSingle.classList.remove("active")
}
}
function displayVocabularies(level){
  removeActive()
  const clickButton=  document.getElementById(`id-${level}`)
  clickButton.classList.add("active")
 
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then(response=>response.json())
    .then(datas=>getVocabularies(datas.data))
    
}
function vDetails(id){

  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
  .then(resp=>resp.json())
  .then(ans=>vDetailsSet(ans.data))

  
}
const synonymWords=(words)=>{
  for(let word of words){
 const synonymDiv=document.getElementById("synonymDiv")
 const p=document.createElement('p')
p.innerText=word;
p.classList="border border-gray bg-gray-800 text-center py-2 text-white"
 synonymDiv.appendChild(p)

  }

}
const vDetailsSet=(info)=>{
    const detailButton=document.getElementById("vocabulary_details")
  detailButton.showModal()
  detailButton.innerHTML=`
    <div class="modal-box !bg-none">
   <div class="card bg-black text-white w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">${info.word} (${info.pronunciation})</h2>
    <p>
    <h1>Meaning</h1>
    <h2>${info.meaning}</h2>
    </p>
    <p class="">
    <h1>Example</h1>
    <h2>${info.sentence}</h2>
    </p>
    <p>
    <h1>সমার্থক শব্দ গুলো</h1>
     <div id="synonymDiv" class="flex flex-row gap-2"></div>
    </p>
    <div class="card-actions justify-end">
         <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
    </div>
  </div>
</div>
 
  </div>
  
  
  
  `
  synonymWords(info.synonyms)

}

function emptyLesson(){
  const vocabularyPart=document.getElementById("vocabularyPart")
  vocabularyPart.innerHTML=` 
    <div class="flex flex-col items-center justify-center my-10 col-span-4 bg-slate-100 py-10">
      
      <p class=" my-2 text-gray-500">আপনি এখনো কোন Lesson Select করেন ন</p>
      <p class="text-4xl font-medium mb-2">একটি Lesson Select করুন।</p>
    </div> 
  
  `
}
emptyLesson()

const getVocabularies=(vocabularies)=>{
  const vocabularyPart=document.getElementById("vocabularyPart")
  vocabularyPart.innerHTML=` `
    if(vocabularies.length===0){
      vocabularyPart.innerHTML=`
      
   <div class="flex flex-col items-center justify-center my-10 col-span-4 bg-slate-100 py-3">
      <i class="fa-solid fa-triangle-exclamation text-5xl mt-2"></i>
      <p class="text-2xl my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <p class="text-2xl mb-2">নেক্সট Lesson এ যান</p>
    </div> 
      
      `
    
    }
vocabularies.forEach(vocabulary=>{
  
    
    const div=document.createElement("div")
    div.innerHTML=`
        
  <div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <div class=" flex flex-col justify-center items-center">
    <h2 class="card-title font-bold text-2xl">${vocabulary.word}</h2>
    <p class="font-semibold text-xl py-4">Meaning /Pronounciation</p>
    <p class="text-2xl font-semibold text-[#18181B]">"${vocabulary.meaning}/${vocabulary.pronunciation}"</p></div>
    <div class=" flex flex-row-reverse justify-between ">
      <i class="fa-solid fa-play"></i>
      <i class="fa-solid fa-circle-info" onclick="vDetails(${vocabulary.id})"></i>
      
    </div>
  </div>
</div>
    
    
    
   `

    vocabularyPart.appendChild(div)
})
}

function setCatagories(catas){
catas.forEach(cata => {
            // const vocabularies=document.getElementById("vocabularies")
    const catagory=document.getElementById("catagories")

     catagory.style.display="flex"
    catagory.style.flexDirection="row"
    catagory.style.justifyContent="center"
    catagory.style.alignItems="center"
    catagory.style.gap="16px"

    const btn=document.createElement("button")
    btn.innerHTML=`
        <button class="btn removeActive text-blue-800 hover:bg-blue-800 hover:text-white" onclick="displayVocabularies(${cata.level_no})" id="id-${cata.level_no}">Lesson-${cata.level_no}</button>
    `
    catagory.appendChild(btn)
     
    
    })
}
// form fillup
const activeDisplay=()=>{
  document.getElementById("vocabularies").classList.remove("hidden")
  document.getElementById("faq").classList.remove("hidden")
  document.getElementById("navbar").classList.remove("hidden")
  document.getElementById("banner").classList.add("hidden")
  const banner=document.getElementById("header")
  banner.classList.add("sticky")
  banner.classList.add("top-0")

}
const removeDisplay=()=>{
  document.getElementById("vocabularies").classList.add("hidden")
  document.getElementById("faq").classList.add("hidden")
  document.getElementById("navbar").classList.add("hidden")
  document.getElementById("banner").classList.remove("hidden")
  

}


const formFillup=()=>{
  const inputName=document.getElementById("inputName")
  const inputPass=document.getElementById("inputPass")
 if(inputName.value.length===0){
  alert("Please input a name")
 }
 else{

 }
 if(inputPass.value!=='123456'){
    alert("Please input a valid password")
 }
 else{
   activeDisplay()
 }



}



displayLevel()