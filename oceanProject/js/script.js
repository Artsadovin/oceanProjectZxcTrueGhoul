/*

$.ajax({
    url: 'func.php',
    type: 'POST',
    data: txt,
    success: function(data){
     $('p.out').text(data);
   },
    error: function(){
  console.log('ERROR');
    }
 })*/



document.querySelector("#regcars").onclick = function() {
  //alert(1);
  var zaezddate = document.getElementById('zad').value;
  var zaezdtime = document.getElementById('zat').value;
  var num = document.getElementById('nn').value;
  var nom = document.getElementById('telephone').value;
  //alert(num + " " + nom);
  var z = hrest(zaezddate, zaezdtime);
  var v = z + 1440;

  $.ajax({
      url: 'checkcars.php',
      type: 'POST',
      dataType: 'json',
      data: {
        func: 'func_data',
        num: num,
        nom: nom,
        za: z,
        vi: v,
        res: '',
      },
      success: function(data){
        result = data.res;
       $('p.out').text(result);
     },
      error: function(){
    console.log('ERROR of php');
      }
    })
}


function hrest(d, t){
  var year = Number(d[0] + d[1] + d[2] + d[3]);
  var mounth = Number(d[5] + d[6]);
  var day = Number(d[8] + d[9]);
  var hour = Number(t[0] + t[1]);
  var min = Number(t[3] + t[4]);

  var yeark = ((year - 1)*365*24*60) + ((Math.floor((year-1)/4))*24*60);
  mounth = mounth - 1;
  var mounthk = 0;

  if (mounth === 2) {mounthk = 59}
  if (mounth === 3) {mounthk = 90}
  if (mounth === 4) {mounthk = 120}
  if (mounth === 5) {mounthk = 151}
  if (mounth === 6) {mounthk = 181}
  if (mounth === 7) {mounthk = 212}
  if (mounth === 8) {mounthk = 243}
  if (mounth === 9) {mounthk = 273}
  if (mounth === 10) {mounthk = 304}
  if (mounth === 11) {mounthk = 334}

  if (year/4 === Math.floor(year-1/4)){mounthk += 1}

  if (mounth === 0) {mounthk = 0}
  if (mounth === 1) {mounthk = 31}

  return yeark + mounthk*24*60 + day*24*60 + hour*60 + min;
}
