function tgasHome(tabInfo,tabSetting,tabConfig,tabAlarm,divInfo,divSetting,divConfig,divAlarm)
{
	var self = this;
	self.isInfoActive = true;
	self.isSettingActive = false;
	self.isConfigActive = false;
	self.isAlarmActive = false;

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
		self.invalidate();
	};
	self.int();
	return self;
}