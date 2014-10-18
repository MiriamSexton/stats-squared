var tot = "cost_total";

var typ = "id_";
var bon = "bonus_";
var cst = "cost_";
var sta = "stat_";
var cost_total;
var attributes = ["int", "wis", "cha", "str", "dex", "con"];	
var firstCalc = 1;
var MAXCOST;

var inp_ids = new Array();
var bon_ids = new Array();
var cst_ids = new Array();

function ChangeMax( ){
  MAXCOST = (document.getElementById('id_max_cost').value * 1);
  CheckTotal();
}

function CheckTotal( ){
  if ( cost_total.value > MAXCOST ) {
    cost_total.setAttribute('class', 'over_total');
  } else {
    cost_total.setAttribute('class','normal');
  }
}

  
function Calculate( ) {
//document.getElementById('id_max_cos')
  cost_total = document.getElementById(typ.concat(cst,'total'));
  
  if (firstCalc){
    for (i in attributes) {
      inp_ids[i] = typ.concat(sta,attributes[i]);
      bon_ids[i] = typ.concat(bon,attributes[i]);
      cst_ids[i] = typ.concat(cst,attributes[i]);
    }
    MAXCOST = document.getElementById('id_max_cost').value;
    MAXCOST *= 1;
    firstCalc = 0;
  }
  
  var cst_run_total = 0;
  var bon_run_total = 0;
  
  for( i in inp_ids ) {
    var x = document.getElementById(inp_ids[i]);
    
    if ( x.value ){
      var num = x.value;
      var num_cost = Math.pow(num,2);
      document.getElementById(cst_ids[i]).value = num_cost;
      cst_run_total += num_cost;

      var bonfe = GetBonus(num);
      bonfe *= 1;
      document.getElementById(bon_ids[i]).value = bonfe;
      bon_run_total += bonfe;
    } else {
      document.getElementById(cst_ids[i]).value = "";
      document.getElementById(bon_ids[i]).value = "";
    }
  }
  cost_total.value = cst_run_total;
  CheckTotal();
  document.getElementById("id_bonus_total").value = bon_run_total;

//  total.value = running_total;


}
  


function WriteHeader( ) {
  var row = document.createElement('tr');

  var th1 = document.createElement('th');
  var th2 = document.createElement('th');
  var th3 = document.createElement('th');
  var th4 = document.createElement('th');
  
  row.appendChild(th1);
  row.appendChild(th2);
  row.appendChild(th3);
  row.appendChild(th4);

  
  th2.appendChild(document.createTextNode('STAT'));
  th2.appendChild(document.createTextNode('VALUE'));
  th3.appendChild(document.createTextNode('BONUS'));
  th4.appendChild(document.createTextNode('COST'));
  
  return row;

}
  
function WriteBody( write_id, hide_id ) {
  var classes=['even', 'odd']
  var ret = document.createElement('table');
  ret.setAttribute('id','stat_table');
  
  var header = WriteHeader( );
  header.setAttribute('class','headrow');


  for( i in attributes) {
    var row  = OneStat( attributes[i], typ, bon, cst );
    row.setAttribute('class', classes[i%2]);
    ret.appendChild(row);
  }
  
  ret.appendChild(WriteLastRow());
  
  var me=document.getElementById(hide_id);
  var mom = document.getElementById(hide_id).parentNode;
  var cosal = document.getElementById('id_max_cost').setAttribute('onclick','ChangeMax()');

  mom.appendChild(ret);
  mom.removeChild(me);
    //return ret;
}

function OneStat( iden ) {
  var x = document.createElement('tr');
  
  // number 1 in List
	// contains the LABel
  var l1 = document.createElement('td');
  l1.setAttribute('class','cell');
  var lab = document.createElement('label');
  lab.setAttribute('for', sta.concat(iden));
  var te = document.createTextNode(iden.toUpperCase());
  lab.appendChild(te);
  l1.appendChild(lab);
  
	// contains INPut
  var l2 = document.createElement('td');
  l2.setAttribute('class','cell');
  var inp = document.createElement('input');
  inp.setAttribute('onChange', 'Calculate()');
  inp.setAttribute('type', 'text');
  inp.setAttribute('size', 2);
  inp.setAttribute('id', typ.concat(sta, iden));
  inp.setAttribute('name', sta.concat(iden));
  l2.appendChild(inp);

	// contains CoSt
  var l3 = document.createElement('td');
  l3.setAttribute('class','cell');
  var cs = document.createElement('input');
  cs.setAttribute('type', 'text');
  cs.setAttribute('size', 3);
  cs.setAttribute('id', typ.concat(cst, iden));
  cs.setAttribute('name', cst.concat(iden));
  cs.setAttribute('disabled', 'disabled');
  l3.appendChild(cs);
  
	// contains BOnus
  var l4 = document.createElement('td');
  l4.setAttribute('class','cell');
  var bo = document.createElement('input');
  bo.setAttribute('type', 'text');
  bo.setAttribute('size', 2);
  bo.setAttribute('id', typ.concat(bon, iden));
  bo.setAttribute('name', bon.concat(iden));
  bo.setAttribute('disabled', 'disabled');
  l4.appendChild(bo);

  x.appendChild(l1);
  x.appendChild(l2);
  x.appendChild(l3);
  x.appendChild(l4);
	
  return x;
}

function WriteOneStat(read_id, write_id, typ, cst, sta, attribtes, eventfunc, eventype){
 	counter++;
	var group = "group_";
 	
	//clone node 'read_id'
  var newGroup = document.getElementById(read_id).cloneNode(true);

  //set id of the entire group
  var new_id =  group.concat(attributes[counter]);	
	newGroup.setAttribute('id', new_id);
	
	// get a NodeList of the children
	var newField = newGroup.childNodes;
	
	// identify the childern
	var entry = newField.getElementById(sta);
	var cost =  newField.getElementById(cst);
	var bonus = newField.getElementById(bon); 

  // change the id and name of the children
  entry.setAttribute('id', typ.concat(sta,attribute[counter]));
  entry.setAttribute('name', sta.concat(attribute[counter]));
  entry.setAttribute(eventype, eventfunc);
  cost.setAttribute('id', typ.concat(cst,attribute[counter]));
  cost.setAttribute('name', cst.concat(attribute[counter]));
  bonus.setAttribute('id', typ.concat(bon,attribute[counter]));
  bonus.setAttribute('name', bon.concat(attribute[counter]));

  var new_line = document.createTextNode("\n");
  newGroup.appendChild(new_line);
  document.getElementById(write_id).appendChild(newGroup);
}

	
function WriteLastRow(  ) {

  var row = document.createElement('tr');
  var da1 = document.createElement('td');
  var da2 = document.createElement('td');
  var da3 = document.createElement('td');
  var da4 = document.createElement('td');

  row.appendChild(da1);
  row.appendChild(da2);
  row.appendChild(da3);
  row.appendChild(da4);

  var tex = document.createTextNode('TOTAL:');
  var boldlabel = document.createElement('b');
  boldlabel.appendChild(tex);
  da1.appendChild(boldlabel);

  var ctot = document.createElement("input");
	ctot.setAttribute('type', 'text');
	ctot.setAttribute('size',5);
  ctot.setAttribute('id','id_cost_total');
  ctot.setAttribute('disabled','disabled');
  da3.appendChild(ctot);

	var bontot = document.createElement("input");
	bontot.setAttribute('type', 'text');
	bontot.setAttribute('size',3);
  bontot.setAttribute('id','id_bonus_total');
  bontot.setAttribute('name','bonus_total');
  bontot.setAttribute('disabled','disabled');
  da4.appendChild(bontot);

  return row;
}





function GetBonus( stat ) {
  stat *= 1;
  if ( stat < 10 ){
    var temp = 10 - stat;
    temp *= -1;
    return Math.floor(temp);
  }

  var ans = stat - 10;
  ans /= 2;
  return Math.floor(ans);
}
