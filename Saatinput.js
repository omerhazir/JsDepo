<script>
function sayi(event)
{
var x = document.getElementById('sayi');
  if(event.keyCode != 8 && event.keyCode != 0 && (event.keyCode < 48 || event.keyCode > 57))
        return false;
 if(x.value.replace(":","")>2359){x.value="";x.focus();}
  if(event.keyCode!=8){if (x.value.length == 2){x.value += ":";}}
}
</script>

<input type="text" maxlength="5" id="sayi" onkeydown="return sayi(event);" onkeyup="return sayi(event);"  />
