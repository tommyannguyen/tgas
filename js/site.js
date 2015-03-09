function tgasHome(tabInfo,tabSetting,tabConfig,tabAlarm,divInfo,divSetting,divConfig,divAlarm)
{
	var self = this;
	self.isInfoActive = true;
	self.isSettingActive = true;
	self.isConfigActive = true;
	self.isAlarmActive = true;

	//alarms
	self.no_Alarm_Value = "0";
	self.high_Oxy_Oput_Value = "0";
	self.high_Temp_Air_Value = "0";
	self.low_Pressure_Air_Value = "0";
	self.on_OffValue ="0";
	
	self.invalidate = function()
	{
		if(self.isInfoActive)
		{
			tabInfo.parent().addClass("active");
			divInfo.removeClass("hide");
		}
		else
		{
			tabInfo.parent().removeClass("active");
			divInfo.addClass("hide");
		}

		if(self.isSettingActive)
		{
			tabSetting.parent().addClass("active");
			divSetting.removeClass("hide");
		}
		else
		{
			tabSetting.parent().removeClass("active");
			divSetting.addClass("hide");
		}

		if(self.isAlarmActive)
		{
			tabAlarm.parent().addClass("active");
			divAlarm.removeClass("hide");
		}
		else
		{
			tabAlarm.parent().removeClass("active");
			divAlarm.addClass("hide");
		}

		if(self.isConfigActive)
		{
			tabConfig.parent().addClass("active");
			divConfig.removeClass("hide");
		}
		else
		{
			tabConfig.parent().removeClass("active");
			divConfig.addClass("hide");
		}
	};

	self.alarmInvalidate = function()
	{
		var isChanged = false;
		var value = $("#No_Alarm_Value").text();
		if(value != self.no_Alarm_Value)
		{
		  	self.no_Alarm_Value = value;
			isChanged = true;
		}
	    value = $("#High_Oxy_Oput_Value").text();
		if(value != self.high_Oxy_Oput_Value)
		{
		  	self.high_Oxy_Oput_Value = value;
			isChanged = true;
		}
		value = $("#High_Temp_Air_Value").text();
		if(value != self.high_Temp_Air_Value)
		{
		  		self.high_Temp_Air_Value = value;
				isChanged = true;
		}
		value = $("#Low_Pressure_Air_Value").text();
		if(value != self.low_Pressure_Air_Value)
		{
			self.low_Pressure_Air_Value = value;
			isChanged = true;
		}
		if(isChanged)
		{
			var txtNoAlarm = $("#ref_No_Alarm_Value");
			var alarmNotifyIcon = $("#alarm-notify-icon");
			var txtHighOxyOutput = $("#ref_High_Oxy_Oput_Value");
			var txtHighTemp = $("#ref_High_Temp_Air_Value");
			var txtLowPressure = $("#ref_Low_Pressure_Air_Value");
			
			if(self.no_Alarm_Value == "0")
			{
				txtNoAlarm.addClass("hidden");
				alarmNotifyIcon.removeClass("hidden");
			}
			else
			{
				txtNoAlarm.removeClass("hidden");
				alarmNotifyIcon.addClass("hidden");
			}

			if(self.high_Oxy_Oput_Value == "0")
			{
				txtHighOxyOutput.addClass("hidden");
			}
			else
			{
				txtHighOxyOutput.removeClass("hidden");
			}

			if(self.high_Temp_Air_Value == "0")
			{
				txtHighTemp.addClass("hidden");
			}
			else
			{
				txtHighTemp.removeClass("hidden");
			}

			if(self.low_Pressure_Air_Value == "0")
			{
				txtLowPressure.addClass("hidden");
			}
			else
			{
				txtLowPressure.removeClass("hidden");
			}
		}
	
		// On-Off button
		
		value = $("#ON_OFF").text();
		var btnOnOff = $("#btnOnOff");
		if(value =="1")
		{
			btnOnOff.addClass("plc-on");
			btnOnOff.removeClass("plc-off");
			btnOnOff.attr("src","img/N2machine_Start.png");
		}
		else
		{
			btnOnOff.removeClass("plc-on");
			btnOnOff.addClass("plc-off");
			btnOnOff.attr("src","img/N2machine_Stop.png");
		}
	};
	self.setOnOff = function(val)
	{
		var on_off_value = "1";
		if(!val){
			on_off_value = "0";
		}
		var onOffFrame = $("#SetOnOffFrame").contents();
		var txtOnOff = onOffFrame.find('#ON_OFF');
		txtOnOff.val(on_off_value);
		onOffFrame.find('form').submit();
	}
	self.int = function()
	{
		tabInfo.click(function(e){
			var parent = tabInfo.parent();
			if(parent.hasClass("active"))
			{
				self.isInfoActive = false;
			}
			else
			{
				self.isInfoActive = true;
			}
			self.invalidate();
			e.preventDefault();
		});
		tabSetting.click(function(e){
			var parent = tabSetting.parent();
			if(parent.hasClass("active"))
			{
				self.isSettingActive = false;
			}
			else
			{
				self.isSettingActive = true;
			}
			self.invalidate();
			e.preventDefault();
		});
		tabConfig.click(function(e){
			var parent = tabConfig.parent();
			if(parent.hasClass("active"))
			{
				self.isConfigActive = false;
			}
			else
			{
				self.isConfigActive = true;
			}
			self.invalidate();
			e.preventDefault();
		});
		tabAlarm.click(function(e){
			var parent = tabAlarm.parent();
			if(parent.hasClass("active"))
			{
				self.isAlarmActive = false;
			}
			else
			{
				self.isAlarmActive = true;
			}
			self.invalidate();
			e.preventDefault();
		});
		
		var btnOnOff = $("#btnOnOff");
		btnOnOff.click(function(){
			var value = $("#ON_OFF").text();
			if(value =="1")
			{
				self.setOnOff(false);
			}
			else
			{
				self.setOnOff(true);
			}
		});
		self.invalidate();
	};
	self.int();
	return self;
}

function authenticationService()
{
	var self = this;
	self.autoLogin = function()
	{
		var spost = 'Login=admin&Password=ToanGiang';
		$.post("/FormLogin",spost,function(result){
			console.log("auto-login: success");
			console.log(result);
		});
	}
	
	return self;
}


function tgasGraph()
{
	var self = this;
	$.ajaxSetup({ cache: false });
	self.line1 =  new TimeSeries();
	self.line2 = new TimeSeries();
	self.x= 0.0;
	self.stringValue = "";
	self.minValue = 0;
	self.maxValue = 100;
	self.scaleValue = 1;
	
	self.g1; 
	self.g2;
	self.g3;
	self.g4;
	self.int = function()
	{	
		var btnConfig = $("#btnConfig");
		var ddlConfigMin = $("#ddlConfigMin");
		var ddlConfigMax = $("#ddlConfigMax");
		var ddlConfigScale = $("#ddlConfigScale");
		
		var html ="";
		for(var i= 0;i <= 100;i++)
		{
			html+="<option value='"+i+"'>"+i+"</option>";
		}
		ddlConfigMin.html(html);
		ddlConfigMin.val(self.minValue.toString());
		ddlConfigMax.html(html);
		ddlConfigMax.val(self.maxValue.toString());

		ddlConfigScale.val(self.scaleValue.toString());
		
		self.resizeGraph();
    	var smoothie = new SmoothieChart({minValue: self.minValue, maxValue: self.maxValue, labels: "#000000", millisPerPixel: 441, timeStamps: true, maxStorageTime: 1800000, interpolation: "line", grid: ({strokeStyle:"#708090", fillStyle:"#ffffff", lineWidth:1, millisPerLine:30000, verticalSections:5})});
    	smoothie.addTimeSeries(self.line1, ({strokeStyle:"rgb(255, 0, 0)", lineWidth:2}));
    	smoothie.addTimeSeries(self.line2, ({strokeStyle:"rgb(0, 255, 0)", lineWidth:2}));
      	smoothie.streamTo(document.getElementById("smoothie"), 1000);
        self.changeTimeScale(1,smoothie,'smoothie');
        window.addEventListener('resize', self.resizeGraph, false);
		window.addEventListener('orientationchange', self.resizeGraph, false);
		
		$('#myModal .btn-primary').click(function() {
			smoothie.options.minValue = ddlConfigMin.val();
			smoothie.options.maxValue = ddlConfigMax.val();
			
			self.changeTimeScale(parseInt(ddlConfigScale.val()),smoothie,'smoothie');
			$('#myModal').modal('hide');
		});
		
        setInterval(function() {
				self.readValues();
			},1500);
	}
	self.test = function()
	{
		var test1 = 10;
		self.x = self.x+0.25;
		//line1.append(new Date().getTime(), 100.0*Mat.Abs(Math.sin(x)));
		self.line1.append(new Date().getTime(), test1);
		//line2.append(new Date().getTime(), 100.0*Math.cos(x*Math.PI/180)+10*Math.random());
		//self.g1.refresh(parseInt(test1));
		//self.g2.refresh(getRandomInt(50, 100));



		var test2 = "";
				if (self.stringValue !='' && self.stringValue != test2 && test2.trim() !=''){
					//toastr.options.positionClass = "toast-top-full-width";
					toastr.options.timeOut = 20000;
					toastr.options.extendedTimeOut = 0;
					toastr.error(test2.trim());
				}
				self.stringValue = test2;
	};
	self.readValues = function()
	{
		//self.test();return;
		$.get("N2_Pressure_Input.htm", function(result){
			    self.x = self.x+0.25;
			    //line1.append(new Date().getTime(), 100.0*Mat.Abs(Math.sin(x)));
			    self.line1.append(new Date().getTime(), result);
			    //line2.append(new Date().getTime(), 100.0*Math.cos(x*Math.PI/180)+10*Math.random());
				//self.g1.refresh(parseInt(result));
				//self.g2.refresh(getRandomInt(50, 100));

			});

			$.get("IOtoastvalue.htm", function(result){
				if (self.stringValue !='' && self.stringValue != result && result.trim() !=''){
					//toastr.options.positionClass = "toast-top-full-width";
					toastr.options.timeOut = 20000;
					toastr.options.extendedTimeOut = 0;
					toastr.error(result.trim());
				}
				self.stringValue = result;

			});
	}
	self.changeTimeScale = function(val, smooth, canvas) {
		var c = document.getElementById(canvas);
		var w = c.width;
		var mspl = smooth.options.grid.millisPerLine;
		var mspp = smooth.options.millisPerPixel;
		var lpc = w * mspp / mspl;
		var x = val * 60;
		x = Math.ceil(x);
		smooth.options.millisPerPixel = x / w * 1000;
		smooth.options.grid.millisPerLine = w * smooth.options.millisPerPixel / lpc;
		};
	self.resizeGraph = function() {
	    var gameArea = $('#smoothie-div');
	    var gameCanvas = document.getElementById('smoothie');
	    gameCanvas.width = gameArea.width();
	    gameCanvas.height = gameArea.height();
	}

	self.int();
	return self;
}
