'use strict';
//Task 1
let input1='asdasd asdasd:\'asdad asdasd asdasd\'-asdad. asdasdasd:\'asdasd\'asd asdasd\'asd asda\'asd\'. asdasdasd:\'asda\'as asda\' asdasd-asd';
let output1=input1.replace(/'/g,'\"')
console.log(output1+' - task 1')
//Task 2
let input2='asdasd asdasd:\'asdad asdasd asdasd\'-asdad. asdasdasd:\'asdasd\'asd asdasd\'asd asda\'asd\'. asdasdasd:\'asda\'as asda\' asdasd-asd';
let output2=input2.replace(/(?<=:)'(\b\w+\s?(?:[a-z]+\'?\w+[,-]?\s?)+\w+\b)'/g,'"$1"');
console.log(output2 + ' - task 2');

//Task 3
const name='mark';
const checkName=name=>!(/\d+|\W+/gi.test(name));
console.log(checkName(name));

const phone='+7(985)456-987';
const checkPhone=phone=>/\+7\(\d{3}\)\d{3}\-\d{3}/g.test(phone);
console.log(checkPhone(phone));

const email='mymail@mail.ru'   //д mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
const checkEmail=email=>/\w+[.-]?@mail.ru\b/g.test(email);
console.log(checkEmail(email));