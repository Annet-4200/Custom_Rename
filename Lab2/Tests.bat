chcp 1251
echo on
cls

@echo TEST 1
@echo ����: �������� ������� �� ��������� �������.
node myREN.js /? 
@pause
@cls

@echo TEST 2
@echo ����: ������������� ����� folder � folder1 � ������� ��������(�� ���������) � ������� �������� �������.
node myREN.js folder folder1 
@dir
node myREN.js folder1 folder
@pause
@cls

@echo TEST 3
@echo ����: ������������� ���� Text.txt � Text1.txt � ������� ��������(�� ���������) c ��������������� ������������� � ������� �������� �������.
node myREN.js Text.txt Text1.txt /C
@dir
node myREN.js Text1.txt Text.txt
@pause
@cls

@echo TEST 4
@echo ����: ������ ��������� � �������������� ������. 
node myREN.js NonEXIST.txt Non.txt 
@dir
@pause
@cls

@echo TEST 5
@echo ����: �������� ���������� ����� Text.txt � ������������� � File.pdf � ������� �������� � ���������� �������.
node myREN.js Text.txt File.pdf 
@dir
node myREN.js File.pdf Text.txt
@pause
@cls

@echo TEST 6
@echo ����: ���������� ������������� ���� � �������������� ���������.
node myREN.js Text.txt File.pdf /H
@dir
@pause
@cls

@echo TEST 7
@echo ����: ������������� ��� ����� Rare.rar �� Changed.rar � ����������� ��������� ����������, �������� ���������� �� ���������.
node myREN.js Rare.rar Changed.rar /R
@dir
node myREN.js Changed.rar Rare.rar /R
@pause
@cls