function tarih(tr,format){
  /*Kullanılabilir Formatlar 
Gün  : dd,ddd,dddd -> 01,Pzt,Pazartesi
Ay   : mm,mmm,mmmm -> 01,Oca,Ocak
Yıl  : yy,yyy      -> 17,2017
saat : hh,hhh      -> 01:30,01:30:20
Örnekler:
tarih()                                               > 31.01.2017 Salı
tarih('01.31.2017')                                   > 31.01.2017 Salı
tarih('dd-mm-yyyy hh')                                > 30-04-2017 13:02
tarih('01.31.2017','dd.mmmm.yyyy dddd hh')            > 31.Ocak.2017 Salı 13:02
tarih(new Date(),'Tarih: dd mmmm yyyy dddd Saat:hhh') > Tarih: 30 Nisan 2017 Pazar Saat:13:02:00
*/  
if (tr==undefined && format==undefined ){tr=new Date(); format="dd.mm.yyyy dddd"}//Boş Gönderilirse
if (new Date(tr)!="Invalid Date" && format==undefined){tr=new Date(tr); format="dd.mm.yyyy dddd"} //Sadece Tarih Gönderilirse
if (new Date(tr)=="Invalid Date" && format==undefined){format=tr;tr=new Date()} //Sadece Format gönderilirse 
 
    tr=new Date(tr);
    var gun=tr.getDate(); //1-31
    var gun2=tr.getDay(); //0-6
    var ay=tr.getMonth();
    var yil=tr.getFullYear();
    var aylar= ['Ocak', 'Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül', 'Ekim','Kasım','Aralık'];
    var gunler= ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    var gunlerk= ['Pzr','Pzt','Sal','Çar','Per','Cum','Cmt'];
    var saat=tr.toLocaleTimeString();
//Tarihi  Biçimlendirelim...
    //Gün
    format=format.replace("dddd",gunler[gun2]);
    format=format.replace("ddd",gunlerk[gun2]);
    if (gun.toString().length < 2) {gun="0"+gun}
    format=format.replace("dd",gun);
    
    //Ay
    format=format.replace("mmmm",aylar[ay]);
    format=format.replace("mmm",aylar[ay].substr(0,3));
    if ((ay+1).toString().length<2) {ay="0"+(ay+1)}else{ay=ay+1}; 
    format=format.replace("mm",ay);
    //Yıl
    format=format.replace("yyyy",yil);
    format=format.replace("yy",yil.toString().substr(-2)); 
    //Saat
    if(saat="00:00:00"){saat= new Date().toLocaleTimeString()}
    format=format.replace("hhh",saat);
    format=format.replace("hh",saat.substr(0,5));  
  return format;
};
