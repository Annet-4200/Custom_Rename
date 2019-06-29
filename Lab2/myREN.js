const path = require('path');
const fs = require('fs');
try {
  const fd = fs.openSync('help.txt', 'r')
} catch (err) {
  console.error(err)
}
const ERROR_SUCCESS = 0x0;
const ERROR_FILE_NOT_FOUND = 0x2;
const ERROR_PATH_NOT_FOUND = 0x3;
const ERROR_BAD_ARGUMENTS = 0xA0;
const ERROR_ALREADY_EXIST = 0xB7;
const ERROR_INVALID_FLAG_NUMBER = 0xBA;
const ERROR_ACCESS_DENIED = 0x5;
const ERROR_META_EXPANSION_TOO_LONG = 0xD;

if (process.argv[2] == "/?" || process.argv[2] == "HELP") {
    const help = require("./help");
    console.log("TEST IS OK!");
}
else {
    let result = Rename();
    if (result == 0)
    {
        console.log("TEST IS OK!");
    }
    else console.log("TEST IS NOT OK!");
}

function Rename()
{
    let Name = "", NewName = "";
    let FullPath = "", Path = "";
    let copy = false, ispathset = false, rec = false;


    for (let i = 2; i < process.argv.length; i++)
    {

        if (process.argv[i] == "/C")
        {
            copy = true;
        }
        else if (process.argv[i] == "/R")
        {
            rec = true;
        }
        else if (process.argv[i][0] == '/')
        {
            console.log("Указанный атрибут не найден.");
            return ERROR_INVALID_FLAG_NUMBER;
        }
        else
        {
            if (!ispathset)
            {
                    FullPath = process.argv[i];
                    Name = path.basename(FullPath);
                    Path = path.dirname(FullPath);
                    if (Path == "" || Path.includes("."))
                    {
                        Path = path.dirname(path.resolve(FullPath));
                    }
                    if (FullPath != "*.*")
                    {
                        if (fs.existsSync(FullPath))
                        {
                        ispathset = true;
                        }
                        else
                        {
                        FullPath = path.resolve(FullPath) + "\\" + FullPath;
                        if (fs.existsSync(FullPath))
                        {
                            ispathset = true;
                        }
                        else
                        {
                            console.log("Указанный файл или директория не существует.");
                            return ERROR_PATH_NOT_FOUND;
                        }
                        }
                    }
                    else ispathset = true;
                continue;           
            }
            if (NewName == "")
            {
                NewName = process.argv[i];
                continue;
            }
        }
    }
    if (ispathset)
    {
        return Recursion(rec, copy, Name, NewName, Path);
    }
    else
    {
        console.log("Неверный формат команды.");
        return ERROR_BAD_ARGUMENTS;
    }
}
function Recursion(rec, copy, Name, NewName, Path)
{
    if (rec)
    {
        let dir = fs.readdirSync(Path,{ withFileTypes: true} );
        for (var iii = 0; iii< dir.length;iii++) // рекурсия
        {
            if (dir[iii].isDirectory()){
            Recursion(rec,copy, Name,NewName,Path+"\\"+dir[iii].name);
            }
        }
    }
    let counter = 0;
    let temp = NewName;
    let newFullPath = Path +"\\" + temp;
    while (fs.existsSync(newFullPath))
    {
        counter++;
        temp = path.basename(NewName, path.extname(NewName)) + "("+ counter+")" +path.extname(NewName);
        newFullPath = Path +"\\" + temp;
    }
    if (counter != 0)
    { NewName = temp; }

    return Rename_File(copy, Name, NewName, Path);
}

function Rename_File(copy, Name, NewName, Path)
{
            let FullPath = Path +"\\"+ Name;
            try
            {
                if (Name.includes(".")) //Для файлов 
                {
                    if (NewName.includes(".*"))
                    {
                        NewName = path.basename(NewName,path.extname(NewName)) + path.extname(Name);
                    }
                    let newFullPath = Path +"\\"+ NewName;
                    if (copy)
                    {
                        let counter1 = 1;
                        fs.renameSync(FullPath,newFullPath);

                        while (fs.existsSync(FullPath))
                        {
                            FullPath += "(" +counter1+ ")";
                            counter1++;
                        }
                        Name = path.basename(FullPath);
                        FullPath = Path + "\\" + path.basename(Name,path.extname(Name)) + "(copy)" + path.extname(Name);
                        let content = fs.readFileSync(newFullPath, 'utf8'); 
                        fs.writeFileSync(FullPath,content);
                        console.log("Файл был скопирован.");
                    }
                    else { fs.renameSync(FullPath,newFullPath); }
                    console.log("Файл был переименован.");
                    return ERROR_SUCCESS;
                }

                else  //для каталогов
                {
                    let newFullPath = Path +"\\" + NewName;
                    if (copy)
                    {
                        fs.renameSync(FullPath, newFullPath);
                        fs.mkdirSync(FullPath + "(copy)");
                        console.log("Директория была скопирована.");
                    }
                    else { fs.renameSync(FullPath, newFullPath); }
                    console.log("Директория была переименована.");
                    return ERROR_SUCCESS;
                }
            }
            catch (ex)
            {
                console.log(ex);
                return ERROR_FILE_NOT_FOUND;
            }
 }