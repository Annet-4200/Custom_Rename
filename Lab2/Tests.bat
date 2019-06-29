chcp 1251
echo on
cls

@echo TEST 1
@echo Цель: Вызывать справку по системной команде.
node myREN.js /? 
@pause
@cls

@echo TEST 2
@echo Цель: Переименовать папку folder в folder1 в текущем каталоге(по умолчанию) и вернуть название обратно.
node myREN.js folder folder1 
@dir
node myREN.js folder1 folder
@pause
@cls

@echo TEST 3
@echo Цель: Переименовать файл Text.txt в Text1.txt в текущем каталоге(по умолчанию) c предварительным копированиеми и вернуть название обратно.
node myREN.js Text.txt Text1.txt /C
@dir
node myREN.js Text1.txt Text.txt
@pause
@cls

@echo TEST 4
@echo Цель: Запуск программы с несуществующим файлом. 
node myREN.js NonEXIST.txt Non.txt 
@dir
@pause
@cls

@echo TEST 5
@echo Цель: Поменять расширение файла Text.txt и переименовать в File.pdf и вернуть название и расширение обратно.
node myREN.js Text.txt File.pdf 
@dir
node myREN.js File.pdf Text.txt
@pause
@cls

@echo TEST 6
@echo Цель: Попытаться переименовать файл с несуществующим атрибутом.
node myREN.js Text.txt File.pdf /H
@dir
@pause
@cls

@echo TEST 7
@echo Цель: Переименовать все файлы Rare.rar на Changed.rar с сохранением исходного расширения, двигаясь рекурсивно по подпапкам.
node myREN.js Rare.rar Changed.rar /R
@dir
node myREN.js Changed.rar Rare.rar /R
@pause
@cls