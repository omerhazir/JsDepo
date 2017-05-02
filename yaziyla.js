var sayi ="1250500.50";
document.write(Yaziyla(sayi,2,"TL","Krş","#",null,null,null) );
function Yaziyla(sayi,kurusbasamak,parabirimi, parakurus,diyez, bb1, bb2, bb3) {

var b1 = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
var b2 = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
var b3 = ["", "yüz", "bin", "milyon", "milyar", "trilyon", "katrilyon"];

if (bb1 != null) { // farklı dil kullanımı yada farklı yazım biçimi için
b1 = bb1;
}
if (bb2 != null) { // farklı dil kullanımı
b2 = bb2;
}
if (bb3 != null) { // farklı dil kullanımı
b3 = bb3;
}

var say1, say2 = ""; // say1 virgül öncesi, say2 kuruş bölümü
var sonuc = "";

sayi = sayi.replace(",", "."); //virgül noktaya çevrilir

if (sayi.indexOf(".") > 0) { // nokta varsa (kuruş)

say1 = sayi.substring(0, sayi.indexOf(".")); // virgül öncesi
say2 = sayi.substring(sayi.indexOf("."), sayi.length); // virgül sonrası, kuruş

} else {
say1 = sayi; // kuruş yok
}

rk = say1.split(""); // rakamlara ayırma

var son;
var w = 1; // işlenen basamak
var sonaekle = 0; // binler on binler yüzbinler vs. için sona bin (milyon,trilyon...) eklenecek mi?
var kac = rk.length; // kaç rakam var?
var sonint; // işlenen basamağın rakamsal değeri
var uclubasamak = 0; // hangi basamakta (birler onlar yüzler gibi)
var artan = 0;  // binler milyonlar milyarlar gibi artışları yapar
var gecici;

if (kac > 0) { // virgül öncesinde rakam var mı?

for (i = 0; i < kac; i++) {

son = rk[kac - 1 - i]; // son karakterden başlayarak çözümleme yapılır.
sonint = parseInt(son); // işlenen rakam

if (w == 1) { // birinci basamak bulunuyor

sonuc = b1[sonint] + sonuc;

} else if (w == 2) { // ikinci basamak

sonuc = b2[sonint] + sonuc;

} else if (w == 3) { // 3. basamak

if (sonint == 1) {
sonuc = b3[1] + sonuc;
} else if (sonint > 1) {
sonuc = b1[sonint] + b3[1] + sonuc;
}
uclubasamak++;
}

if (w > 3) {    // 3. basamaktan sonraki işlemler

if (uclubasamak == 1) {

if (sonint > 0) {
sonuc = b1[sonint] + b3[2 + artan] + sonuc;
if (artan == 0) { // birbin yazmasını engelle
 if(kac-1==i){ //
  sonuc = sonuc.replace(b1[1] + b3[2], b3[2]);
 }
}
sonaekle = 1; // sona bin eklendi
} else {
sonaekle = 0;
}
uclubasamak++;

} else if (uclubasamak == 2) {

if (sonint > 0) {
if (sonaekle > 0) {
sonuc = b2[sonint] + sonuc;
sonaekle++;
} else {
sonuc = b2[sonint] + b3[2 + artan] + sonuc;
sonaekle++;
}
}
uclubasamak++;

} else if (uclubasamak == 3) {

if (sonint > 0) {
if (sonint == 1) {
gecici = b3[1];
} else {
gecici = b1[sonint] + b3[1];
}
if (sonaekle == 0) {
gecici = gecici + b3[2 + artan];
}
sonuc = gecici + sonuc;
}
uclubasamak = 1;
artan++;
}

}

w++; // işlenen basamak

}
} // if(kac>0)

if (sonuc=="") { // virgül öncesi sayı yoksa para birimi yazma
parabirimi = "";
}

say2 = say2.replace(".", "");
var kurus = "";

if (say2!="") { // kuruş hanesi varsa

if (kurusbasamak > 3) { // 3 basamakla sınırlı
kurusbasamak = 3;
}
var kacc = say2.length;
if (kacc == 1) {
say2 = say2 + "0";
kurusbasamak = 2;
}
if (say2.length > kurusbasamak) { // belirlenen basamak kadar rakam yazılır
say2 = say2.substring(0, kurusbasamak);
}
kurusrk = say2.split(""); // rakamlara ayırma
kac = kurusrk.length; // kaç rakam var?
w = 1;

for (i = 0; i < kac; i++) { // kuruş hesabı

son = kurusrk[kac - 1 - i]; // son karakterden başlayarak çözümleme yapılır.
sonint = parseInt(son); // işlenen rakam

if (w == 1) { // birinci basamak

if (kurusbasamak > 0) {
kurus = b1[sonint] + kurus;
}

} else if (w == 2) { // ikinci basamak
if (kurusbasamak > 1) {
kurus = b2[sonint] + kurus;
}

} else if (w == 3) { // 3. basamak
if (kurusbasamak > 2) {
if (sonint == 1) { // 'biryüz' ü engeller
kurus = b3[1] + kurus;
} else if (sonint > 1) {
kurus = b1[sonint] + b3[1] + kurus;
}
}
}
w++;
}
if (kurus=="") { // virgül öncesi sayı yoksa para birimi yazma
parakurus = "";
} else {
kurus = kurus + " ";
}
kurus = kurus + parakurus; // kuruş hanesine 'kuruş' kelimesi ekler
}

sonuc = diyez + sonuc + " " + parabirimi + " " + kurus + diyez;

return sonuc;

}
