


//decla
function Background(){
	this.background_color = "write";
    this.general_BallColor = "red";
	this.numberOfBall = NB;
	this.general_Speed = SP;
	this.general_Radius = SZ;
	
	//begin test kiendv
	_canvas = document.getElementById("canvas");
	_context = _canvas.getContext("2d");
	/*
	_canvas.mousedown(function(e){
		var preX;
		var preY;
		preX = e.pageX - this.offsetLeft;
		preY = e.pageY - this.offsetTop;
		alert("preX = " + preX + " & preY = " + preY);
	});
	*/
	//add event click
	_canvas.addEventListener("mousedown", 	this.button_down, 	false);
	_canvas.addEventListener("mousemove", 	this.drop_move, 	false);
	_canvas.addEventListener("mouseup", 	this.button_up, 	false);
	_canvas.addEventListener("mouseout",	this.mouse_out, 	false);
	_canvas.addEventListener("mouseover",	this.mouse_over, 	false);
	//add event touch
	//end test kiendv
}
//idousuru gamenn wo hajimerutoki ha syoriha toouridesu.
Background.prototype.inittial 	  = function(){
	
}

//kiendv 2008 begin
//mouse ga clicku hajimete.
Background.prototype.button_down  = function(e){
	document.getElementById('bt_st2').style.display='none';
	M_IndexX = e.pageX - _canvas.offsetLeft;
	M_IndexY = e.pageY - _canvas.offsetTop;
	step = 2;
	stopMouse();
}
//kiendv 2008 end

//mouse ga clicku hanarete.
Background.prototype.button_up 	  = function(e){
	document.getElementById('bt_st2').style.display='block';
	if(step != 1){
		step = 1;
		for(i = 0; i< NB; i++){
			var aa,bb;
			aa = Math.floor(Math.random() * 2);
			aa *= 2;
			aa -= 1;
			bb = Math.floor(Math.random() * 2);
			bb *= 2;
			bb -= 1;
			var hehe = Math.random() * SP * aa;
			_ball[i].velocityX = hehe;
			_ball[i].velocityY = Math.sqrt(SP * SP - hehe * hehe) * bb;
			_ball[i].goto_x = -1;
			_ball[i].goto_y = -1;
			_ball[i].acceleratorX = 0;
			_ball[i].acceleratorY = 0;
			_ball[i].jiki = false;
			_ball[i].target = -1;
		}
	}
}	

//kiendv2508 begin
Background.prototype.drop_move 	  = function(e){
	var i=0, j=0, kyori = 0, X_A, Y_A;
	
	for(i = 0; i < NB; i++){
		
	}
	
	M_IndexX = e.pageX - _canvas.offsetLeft;
	M_IndexY = e.pageY - _canvas.offsetTop;
	if(step >= 2){
		step = 3;
		start_temp = 0;
	//	alert("X_A = " + M_IndexX + " & Y_A = " + M_IndexY);
	//	_ball[0].findAccelerator();
		for(i = 0; i< NB; i++){
			_ball[i].velocityX /= 2;
			_ball[i].velocityY /= 2;
			_ball[i].nagasa = _ball[i].findA2();
		//	_ball[i].jiki = false;
		//	_ball[i].target = -1;
		}
	}
}
//kiendv2508 end

//mouse out
Background.prototype.mouse_out 	  = function(e){;
	if(step >= 2){
		step = 1;
		for(i = 0; i< NB; i++){
			var aa,bb;
			aa = Math.floor(Math.random() * 2);
			aa *= 2;
			aa -= 1;
			bb = Math.floor(Math.random() * 2);
			bb *= 2;
			bb -= 1;
			var hehe = Math.random() * SP * aa;
			_ball[i].velocityX = hehe;
			_ball[i].velocityY = Math.sqrt(SP * SP - hehe * hehe) * bb;
			_ball[i].acceleratorX = 0;
			_ball[i].acceleratorY = 0;
			_ball[i].jiki = false;
			_ball[i].target = -1;
			_ball[i].goto_x = -1;
			_ball[i].goto_y = -1;
		}
	}
	document.getElementById('bt_st2').style.display='block';
}

//mouse over
Background.prototype.mouse_over	  = function(e){
//	alert("mouse over");
}

//hajimeru gamen
Background.prototype.hajime = function(){
	var interval = 10;
	var i;
	_ball = new Array();
	for(i = 0; i< NB; i++){
		_ball[i] = new Ball(_canvas.width,_canvas.height);
	}
	UD = setInterval("update()",interval);
	LC = setInterval("laychua()",interval * 2);
}

function draw(){
    _context.clearRect(0,0,_canvas.width,_canvas.height);
	
	var i;
	for(i = 0; i< NB; i++){
		_ball[i].draw(_context);
	}

}
function update(){
	
	var i;
//	var select = document.getElementById("bgcolor"); //ve lai background
//	var selectedColor = select.options[select.selectedIndex].value;
	_canvas.style.background = "" + BgCL;//end
	for(i = 0; i< NB; i++){
		_ball[i].move();
		_ball[i].checkCollision();
	}
		//kasanaru ball wo cyekkusuru
	var i,j;
	var X_A, Y_A;
	var kyori;
	for(i = 0; i < NB; i++){
		for(j = i+1; j< NB; j++){
			//kyori wo keisannsuru
			kyori = Math.sqrt((_ball[j].index_X -_ball[i].index_X) * (_ball[j].index_X -_ball[i].index_X) + 
							  (_ball[j].index_Y -_ball[i].index_Y) * (_ball[j].index_Y -_ball[i].index_Y));
			
			//ichi wo syouseisuru, tadasiku naru tameni
			if(kyori <= 0.1){
				X_A = 0.1;
				Y_A = 0.1;
				
				_ball[j].index_X += X_A;
				_ball[j].index_Y += Y_A;
				
				_ball[i].index_X -= X_A;
				_ball[i].index_Y -= Y_A;
				
			}
			else if(kyori < 2 * SZ){
				X_A = (_ball[j].index_X -_ball[i].index_X) / kyori * 0.2;
				Y_A = (_ball[j].index_Y -_ball[i].index_Y) / kyori * 0.2;
				
				_ball[j].index_X += X_A;
				_ball[j].index_Y += Y_A;
				
				_ball[i].index_X -= X_A;
				_ball[i].index_Y -= Y_A;
				
			}
		}
	}
	
	collide();
    draw();
}
function laychua(){
	if(step == 3) {
		if(M_IndexX == old_PositionX && M_IndexY == old_PositionY){
			step = 2;
			for(i = 0; i< NB; i++){
				_ball[i].velocityX /= 10;
				_ball[i].velocityY /= 10;
				_ball[i].acceleratorX = 0;
				_ball[i].acceleratorY = 0;
			}
			stopMouse();
		}
		
		old_PositionX = M_IndexX;
		old_PositionY = M_IndexY;
	//	_BkGround.button_down();
	}
	
}

function sainarau(){
	var X_temp, Y_temp;
	var kyori, Min_kyori, kyori_Index;
	var X_A, Y_A;
	var chikai, chikaidikai;

//maruha mouse no ichi wo sagasu
	X_temp = this.goto_x - this.index_X;
	Y_temp = this.goto_y - this.index_Y;
	kyori = Math.sqrt(X_temp * X_temp + Y_temp * Y_temp);

	X_A = X_temp / kyori;
	Y_A = Y_temp / kyori;
//if < 2 + 2 * radius
	if(kyori < 2){
		this.velocityX = 0;
		this.velocityY = 0;
		this.acceleratorX = 0;
		this.acceleratorY = 0;
	}/*
	else if(kyori < 10){
		this.jiki = true;
	}*/
	else if(kyori < 20){
		this.velocityX = 0;
		this.velocityY = 0;
	//	this.acceleratorX = 0;
	//	this.acceleratorY = 0;
	}
//if >= 20 + 2 * radius
	else{
		this.acceleratorX = X_A;
		this.acceleratorY = Y_A;
	}
	return kyori;
}

function stopMouse(){
	var jyusin_X = 0, jyusin_Y = 0;
	var jyusin_Ball;
	var kyori, minKyori, kyori_index;
	
	var ichi = Array(3);
	var temp;
	var X_A, Y_A;
	var i = 0,j = 0;
	
	var check = false;
//	start_temp = 0;
	//jyuusin wo sagasu
	for(i = 0; i< NB; i++){
		_ball[i].velocityX = 0;
		_ball[i].velocityY = 0;
	//	_ball[i].nagasa = _ball[i].findAccelerator();
		jyusin_X += _ball[i].index_X;
		jyusin_Y += _ball[i].index_Y;
	}
	jyusin_X /= NB;
	jyusin_Y /= NB;

	//jyuusin boolu wo sagasu
	minKyori = Math.sqrt((_ball[0].index_X -jyusin_X) * (_ball[0].index_X -jyusin_X) + 
						(_ball[0].index_Y -jyusin_Y) * (_ball[0].index_Y -jyusin_Y));
	kyori_Index = 0;
	for(i = 1; i< NB; i++){
		kyori = Math.sqrt((_ball[i].index_X -jyusin_X) * (_ball[i].index_X -jyusin_X) + 
						(_ball[i].index_Y -jyusin_Y) * (_ball[i].index_Y -jyusin_Y));
		if(minKyori > kyori){
			minKyori = kyori;
			kyori_Index = i;
		}
	}
	//get vector from all
	for(i = 0; i< NB; i++){
		kyori = Math.sqrt((_ball[i].index_X -jyusin_X) * (_ball[i].index_X -jyusin_X) + 
						(_ball[i].index_Y -jyusin_Y) * (_ball[i].index_Y -jyusin_Y));
		erabu_Ichi[i][0] = (_ball[i].index_X -jyusin_X) / kyori;
		erabu_Ichi[i][1] = (_ball[i].index_Y -jyusin_Y) / kyori;
		erabu_Ichi[i][2] = i;
	}
	
//	jyuusin ha saigo ni koukannsimasu
	ichi[0] = erabu_Ichi[kyori_Index][0];
	ichi[1] = erabu_Ichi[kyori_Index][1];
	
	erabu_Ichi[kyori_Index][0] = erabu_Ichi[NB-1][0];
	erabu_Ichi[kyori_Index][1] = erabu_Ichi[NB-1][1];
	
	erabu_Ichi[NB-1][0] = ichi[0];
	erabu_Ichi[NB-1][1] = ichi[1];
	
	//naraberu(so-to) insertion sort (insa-syonn so-to) 1 (ichibanme)
	i = 0;
	while(i< NB - 2){
		check = false;
		ichi[0] = erabu_Ichi[i][0];
		ichi[1] = erabu_Ichi[i][1];
		ichi[2] = erabu_Ichi[i][2];
		temp = i;
		for(j = i + 1; j < NB - 1; j++){
			if(erabu_Ichi[j][0] < 0 && erabu_Ichi[j][1] < 0){
				check = true;
				if(ichi[0] > erabu_Ichi[j][0]){
					ichi[0] = erabu_Ichi[j][0];
					ichi[1] = erabu_Ichi[j][1];
					ichi[2] = erabu_Ichi[j][2];
					temp = j;
				}
			}
		}
		if(!check) break;
		if(erabu_Ichi[i][0] < 0 && erabu_Ichi[i][1] < 0){
			if(erabu_Ichi[i][0] > ichi[0]){
				erabu_Ichi[temp][0] = erabu_Ichi[i][0];
				erabu_Ichi[temp][1] = erabu_Ichi[i][1];
				erabu_Ichi[temp][2] = erabu_Ichi[i][2];
				
				erabu_Ichi[i][0] = ichi[0];
				erabu_Ichi[i][1] = ichi[1];
				erabu_Ichi[i][2] = ichi[2];
			}
		}else{
			erabu_Ichi[temp][0] = erabu_Ichi[i][0];
			erabu_Ichi[temp][1] = erabu_Ichi[i][1];
			erabu_Ichi[temp][2] = erabu_Ichi[i][2];
			
			erabu_Ichi[i][0] = ichi[0];
			erabu_Ichi[i][1] = ichi[1];
			erabu_Ichi[i][2] = ichi[2];
		}
		i++;
	}
/*
	alert(i+"    "+erabu_Ichi[0] + "   " +  erabu_Ichi[1] + "   " +  erabu_Ichi[2]);
	alert(erabu_Ichi[3] + "   " +  erabu_Ichi[4] + "   " +  erabu_Ichi[5]);
	alert(erabu_Ichi[6] + "   " +  erabu_Ichi[7] + "   " +  erabu_Ichi[8] + " __ i = " + i);//*/
//naraberu (so-to) interaction sort (intasakkusyonn so-to) nibanme
	while(i< NB - 2){
		check = false;
		ichi[0] = erabu_Ichi[i][0];
		ichi[1] = erabu_Ichi[i][1];
		ichi[2] = erabu_Ichi[i][2];
		temp = i;
		for(j = i + 1; j < NB - 1; j++){
			if(erabu_Ichi[j][0] >= 0 && erabu_Ichi[j][1] < 0){
				check = true;
				if(ichi[0] > erabu_Ichi[j][0]){
					ichi[0] = erabu_Ichi[j][0];
					ichi[1] = erabu_Ichi[j][1];
					ichi[2] = erabu_Ichi[j][2];
					temp = j;
				}
			}
		}
		if(!check) break;
		if(erabu_Ichi[i][0] >= 0 && erabu_Ichi[i][1] < 0){
			if(erabu_Ichi[i][0] > ichi[0]){
				erabu_Ichi[temp][0] = erabu_Ichi[i][0];
				erabu_Ichi[temp][1] = erabu_Ichi[i][1];
				erabu_Ichi[temp][2] = erabu_Ichi[i][2];
				
				erabu_Ichi[i][0] = ichi[0];
				erabu_Ichi[i][1] = ichi[1];
				erabu_Ichi[i][2] = ichi[2];
			}
		}else{
			erabu_Ichi[temp][0] = erabu_Ichi[i][0];
			erabu_Ichi[temp][1] = erabu_Ichi[i][1];
			erabu_Ichi[temp][2] = erabu_Ichi[i][2];
			
			erabu_Ichi[i][0] = ichi[0];
			erabu_Ichi[i][1] = ichi[1];
			erabu_Ichi[i][2] = ichi[2];
		}
		i++;
	}
	/*
	alert(i+"    "+erabu_Ichi[0] + "   " +  erabu_Ichi[1] + "   " +  erabu_Ichi[2]);
	alert(erabu_Ichi[3] + "   " +  erabu_Ichi[4] + "   " +  erabu_Ichi[5]);
	alert(erabu_Ichi[6] + "   " +  erabu_Ichi[7] + "   " +  erabu_Ichi[8] + " __ i = " + i);//*/
	while(i< NB - 2){
		check = false;
		ichi[0] = erabu_Ichi[i][0];
		ichi[1] = erabu_Ichi[i][1];
		ichi[2] = erabu_Ichi[i][2];
		temp = i;
		for(j = i + 1; j < NB - 1; j++){
			if(erabu_Ichi[j][0] >= 0 && erabu_Ichi[j][1] >= 0){
				check = true;
				if(ichi[0] < erabu_Ichi[j][0]){
					ichi[0] = erabu_Ichi[j][0];
					ichi[1] = erabu_Ichi[j][1];
					ichi[2] = erabu_Ichi[j][2];
					temp = j;
				}
			}
		}
		if(!check) break;
		if(erabu_Ichi[i][0] >= 0 && erabu_Ichi[i][1] >= 0){
			if(erabu_Ichi[i][0] > ichi[0]){
				erabu_Ichi[temp][0] = erabu_Ichi[i][0];
				erabu_Ichi[temp][1] = erabu_Ichi[i][1];
				erabu_Ichi[temp][2] = erabu_Ichi[i][2];
				
				erabu_Ichi[i][0] = ichi[0];
				erabu_Ichi[i][1] = ichi[1];
				erabu_Ichi[i][2] = ichi[2];
			}
		}else{
			erabu_Ichi[temp][0] = erabu_Ichi[i][0];
			erabu_Ichi[temp][1] = erabu_Ichi[i][1];
			erabu_Ichi[temp][2] = erabu_Ichi[i][2];
			
			erabu_Ichi[i][0] = ichi[0];
			erabu_Ichi[i][1] = ichi[1];
			erabu_Ichi[i][2] = ichi[2];
		}
		i++;
	}
//	i--;
//naraberu (so-to) insakkusyonn 4 yonbanme
	while(i< NB - 2){
		check = false;
		ichi[0] = erabu_Ichi[i][0];
		ichi[1] = erabu_Ichi[i][1];
		ichi[2] = erabu_Ichi[i][2];
		temp = i;
		for(j = i + 1; j < NB - 1; j++){
			if(erabu_Ichi[j][0] < 0 && erabu_Ichi[j][1] >= 0){
				check = true;
				if(ichi[0] < erabu_Ichi[j][0]){
					ichi[0] = erabu_Ichi[j][0];
					ichi[1] = erabu_Ichi[j][1];
					ichi[2] = erabu_Ichi[j][2];
					temp = j;
				}
			}
		}
		if(!check) break;
		if(erabu_Ichi[i][0] < 0 && erabu_Ichi[i][1] >= 0){
			if(erabu_Ichi[i][0] > ichi[0]){
				erabu_Ichi[temp][0] = erabu_Ichi[i][0];
				erabu_Ichi[temp][1] = erabu_Ichi[i][1];
				erabu_Ichi[temp][2] = erabu_Ichi[i][2];
				
				erabu_Ichi[i][0] = ichi[0];
				erabu_Ichi[i][1] = ichi[1];
				erabu_Ichi[i][2] = ichi[2];
			}
		}else{
			erabu_Ichi[temp][0] = erabu_Ichi[i][0];
			erabu_Ichi[temp][1] = erabu_Ichi[i][1];
			erabu_Ichi[temp][2] = erabu_Ichi[i][2];
			
			erabu_Ichi[i][0] = ichi[0];
			erabu_Ichi[i][1] = ichi[1];
			erabu_Ichi[i][2] = ichi[2];
		}
		i++;
	}
	/*
	alert(i);
	alert(erabu_Ichi[0] + "   " +  erabu_Ichi[1] + "   " +  erabu_Ichi[2]);
	alert(erabu_Ichi[3] + "   " +  erabu_Ichi[4] + "   " +  erabu_Ichi[5]);
	alert(erabu_Ichi[6] + "   " +  erabu_Ichi[7] + "   " +  erabu_Ichi[8] + " __ i = " + i);
*/
	var part = Math.round((NB - 1) / 4);
	for(i = 0; i < NB - 1; i++){
		if(i < part){
			var id = i * 4 + 1;
			var id1 = erabu_Ichi[i][2];
			_ball[id1].goto_x = v_StepTwo[id][0] * 2 * SZ + M_IndexX;
			_ball[id1].goto_y = v_StepTwo[id][1] * 2 * SZ + M_IndexY;
		}
		else if(i < 2 * part){
			var id = (i - part) * 4 + 2;
			var id1 = erabu_Ichi[i][2];
			_ball[id1].goto_x = v_StepTwo[id][0] * 2 * SZ + M_IndexX;
			_ball[id1].goto_y = v_StepTwo[id][1] * 2 * SZ + M_IndexY;
		}
		else if(i < 3 * part){
			var id = (i - 2 * part) * 4 + 3;
			var id1 = erabu_Ichi[i][2];
			_ball[id1].goto_x = v_StepTwo[id][0] * 2 * SZ + M_IndexX;
			_ball[id1].goto_y = v_StepTwo[id][1] * 2 * SZ + M_IndexY;
		}
		else {
			var id = (i - 3 * part) * 4 + 4;
			var id1 = erabu_Ichi[i][2];
			_ball[id1].goto_x = v_StepTwo[id][0] * 2 * SZ + M_IndexX;
			_ball[id1].goto_y = v_StepTwo[id][1] * 2 * SZ + M_IndexY;
		}
	}
	
	_ball[NB - 1].goto_x = M_IndexX;
	_ball[NB - 1].goto_y = M_IndexY;
}

//hien + vinh begin
function canStartHere(ball) {
		var retval = true;
		for (var i =0; i <_ball.length; i++) {
			if (hitTestCircle(ball, _ball[i])) {
				retval = false;
			}
		}
		return retval;
	}

	function hitTestCircle(ball1,ball2) {
     	var retval = false;
     	var dx = ball1.index_X - ball2.index_X;
     	var dy = ball1.index_Y - ball2.index_Y;
    	var distance = (dx * dx + dy * dy);
		distance=Math.sqrt(distance);
		var l=ball1.radius + ball2.radius;
    	if (distance <= l ) {
     	      retval = true;//dinh nhau
     	}
     	return retval;//ko dinh nhau
  	}
	function collideBalls(ball1,ball2) {
	
 		var dx = ball1.index_X - ball2.index_X;
		var dy = ball1.index_Y - ball2.index_Y;
 
		var collisionAngle = Math.atan2(dy, dx);
 
		var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
		var speed2 = Math.sqrt(ball2.velocityX * ball2.velocityX + ball2.velocityY * ball2.velocityY);
 
		var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
		var direction2 = Math.atan2(ball2.velocityY, ball2.velocityX);
 
		var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
		var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
		var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
		var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
		
		var final_velocityx_1 =  velocityx_2;
		var final_velocityx_2 =  velocityx_1;
 
		var final_velocityy_1 = velocityy_1;
		var final_velocityy_2 = velocityy_2;
 
		ball1.velocityX = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
		ball1.velocityY = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
		ball2.velocityX = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
		ball2.velocityY = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;
 
  		ball1.nextx = (ball1.nextx + ball1.velocityX);
		ball1.nexty = (ball1.nexty + ball1.velocityY);
		ball2.nextx = (ball2.nextx + ball2.velocityX);
		ball2.nexty = (ball2.nexty + ball2.velocityY);
	}
	function collide() {
    	var ball;
    	var testBall;
    	for (var i =0; i <_ball.length; i++) {
        	ball = _ball[i];
        	for (var j = i+1; j < _ball.length; j++) {
              	testBall = _ball[j];
                if (hitTestCircle(ball,testBall)) {
                    collideBalls(ball,testBall);
                 }
           	}
        }
  	}
//hien + vinh end