const fileStructure=require("fs")

const folders=['controllers','middleware','routes','utils','db','models']
folders.forEach((values)=>
{
    fileStructure.mkdir(`./src/${values}` ,{recursive:true}, err=> err ? console.error(err) : console.log("success"))
}
)
