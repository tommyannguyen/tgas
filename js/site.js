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
		}
		else
		{
			btnOnOff.removeClass("plc-on");
			btnOnOff.addClass("plc-off");
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
