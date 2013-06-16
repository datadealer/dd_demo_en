function toTime(ms) {
    var dt = new Date(ms);
    var h = function() {
        var _h = dt.getUTCHours();
        return _h.toString();
    }
    var m = function() {
        var _m = dt.getUTCMinutes();
        if (_m < 10) return '0'+_m.toString();
        return _m.toString();
    }
    var s = function() {
        var _s = dt.getUTCSeconds();
        if (_s < 10) return '0'+_s.toString();
        return _s.toString();
    }
    //return h()+':'+m()+':'+s();
    return m()+':'+s();
}

var kiloSepNumber = function(num) {
    // check for missing parameters and use defaults if so
    sep = ".";
    decpoint = ",";
    // need a string for operations
    num = num.toString();
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";
    if (typeof(x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i=x.length-1;i>=0;i--)
        z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep) z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i=z.length-1;i>=0;i--) x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof(y) != "undefined" && y.length > 0) x += decpoint + y;
    }
    return x;
}


function ksNum(num) {
    return kiloSepNumber(num);
}

function lockscreen(){
      $('#lockscreen').show();
}
function unlockscreen(){
      $('#lockscreen').hide();
}
function unlockscreenFade(){
      $('#lockscreen').delay(200).fadeOut(150,function(){ $('#lockscreen').empty() });
}

function lockscreen_loading(){
      $('#wrap_all').css('box-shadow','0px 0px 128px #666');
      $('#lockscreen_loading').show();
      $('#game_header').hide();
}
function unlockscreen_loading(){
      $('#lockscreen_loading').hide('fade',300);
      $('#game_header').show();
      $('#wrap_all').css('box-shadow','0px 0px 128px #3D5721');
}
function lockscreen_cash(){
      $('#lockscreen_cash').show();
      setTimeout(unlockscreen_cash,400);
}
function unlockscreen_cash(){
      $('#lockscreen_cash').hide('fade',300);
}
function lockscreen_AP(){
      $('#lockscreen_AP').show();
      setTimeout(unlockscreen_AP,400);
}
function unlockscreen_AP(){
      $('#lockscreen_AP').hide('fade',300);
}
function lockscreen_locked(){
      $('#lockscreen_locked').show();
      setTimeout(unlockscreen_locked,400);
}
function unlockscreen_locked(){
      $('#lockscreen_locked').hide('fade',300);
}


function close_popup(popup,cb) {
    popup.css({'background':'rgba(255,255,255,0.5)'});
    popup.hide('clip',300,function(){
                   popup.remove();
                   if (cb){cb();};
    });
}
function close_popup_fast(popup,cb) {
    popup.css({'background':'rgba(255,255,255,0.5)'});
    popup.hide(0,function(){
                   popup.remove();
                   if (cb){cb();};
    });
}


function open_popup(popup,cb) {
    popup.show(0,function(){if (cb){cb();}});
}

function getTokenSettings(id){
    var token=undefined;
    $.each(token_data,function(k,v){
              if (v.token_id==id) {
                  token=v;
              }
    });
    return token;
}

function getAgentById(id,view){
         var ragent=undefined;
         $.each(view._agents,function(k,agent){
               if (agent.settings.data_id==id) ragent=agent;
         });
         return ragent;
     }

function getItemSettings(id,view){
    var item=undefined;
    $.each(project_data,function(k,v){
              if (v.data_id==id) {
                  item=v;
              }
    });
    $.each(customer_data,function(k,v){
              if (v.data_id==id) {
                  item=v;
              }
    });
    $.each(agent_data,function(k,v){
              if (v.data_id==id) {
                  item=v;
              }
      if (view) {
        // prevent error for contact recursion
        $.each(v.contact_data,function(kk,vv){
              if (vv.data_id==id) {
                    item=vv;
                    item.agent=getAgentById(v.data_id,view);
               }
        });
      }
    });
    return item;
}

function decorate_tokens(container,profileset) {
  $(".popup-token",container).click(function(){
      token_inset_popup($(this).attr('token_id'),$(this),profileset);
     });
  $(".popup-token-img",container).hover(function(){
        $(this).toggleClass('popup-token-img-hover');
      },function(){
        $(this).toggleClass('popup-token-img-hover');
      });
}

function project_popup(project) {
  var s=project.settings;
  var button_on = false;
  if (!project.ready && !project.working){
      button_on=true;
  }
  var tokens = new Array();
  $.each(project.getTokens(),function(k,v){
      tokens.push(getTokenSettings(v));
  });
  var pdata = {
      id:"ppopup",
      logo:s.logo,
      title:s.title,
      description:s.description,
      text_upgrades:project_texts.upgrades,
      text_actions:project_texts.actions,
      text_team:project_texts.team,
      button_on:button_on,
      button_text:"Invest",
      button_deco_cash:ksNum(project.getCosts().toString()),
      button_deco_timer:toTime(project.action_time),
      upgrades:project.upgrades,
      actions:project.actions,
      team:project.team,
      amount:ksNum(project.getAmount()),
      risk:Math.max(s.base_risk + project.getUpgradeRisk(), 0),
      tokens:tokens
      }
  var ppopup = $('#popupProjectTemplate').template('ppopup');
  $.tmpl('ppopup',pdata).hide().appendTo("#canvas_wrap");
  decorate_tokens($('#ppopup'),project);
  $('#ppopup .upgrade').click(function(){
      if ($(this).parent().hasClass('locked')){
          lockscreen_locked();
          return this;
      }
    $(".inset-popup_wrap",$(this).parent()).show('scale',{origin:[$(this).position().top+75,$(this).position().left+65]},100);
  });
  $('#ppopup .upgrade_wrap .inset-popup-close').click(function(){
    var par = $(this).parent().parent();
    par.hide('scale',{origin:[par.parent().position().top+75,par.parent().position().left+65]},200);
  });
  $('#ppopup .upgrade_wrap .inset-popup-button').click(function(){
    var par = $(this).parent().parent().parent();
    var upgrade = project.getUpgrade($(this).attr('upgrade_id'));
    if (project.view.game.money() < upgrade.action_cost) {
        lockscreen_cash();
        return this;
    }
    project.buyUpgrade($(this).attr('upgrade_id'));
    var newoutput = $('#popupProjectOutputTemplate').template('newoutput');
    var newtokens = new Array();
    $.each(project.getTokens(),function(k,v){
      newtokens.push(getTokenSettings(v));
    });

    var newdata={
      button_on:button_on,
      button_text:"Invest",
      button_deco_cash:ksNum(project.getCosts().toString()),
      button_deco_timer:toTime(project.action_time),
      amount:ksNum(project.getAmount()),
      risk:Math.max(s.base_risk + project.getUpgradeRisk(), 0),
      tokens:newtokens
    }
    $(".popup-output","#ppopup").html($.tmpl('newoutput',newdata));
    decorate_tokens($('#ppopup'),project);
    $(".button",'#ppopup').click(function(){
        if (project.view.game.money() < project.getCosts()) {
          lockscreen_cash();
          return this;
        }
        close_popup(popup, function(){
                   project.start();
            });
    });
    $(this).parent().hide();
    par.parent().addClass('bought');
    $(".upgrade-bonus_wrap",par.parent()).remove();
    par.hide('scale',{origin:[par.parent().position().top+75,par.parent().position().left+65]},200);
  });
  var popup = $('#ppopup');
  open_popup(popup);
  $(".popup-menu",popup).click(function(){
        $(".popup-tab",popup).hide();
        $(".popup-description",popup).hide();
        var showtab = $(this).attr('tab');
        $(".popup-tab[tab="+showtab+"]").show();
        $(".popup-description[tab="+showtab+"]").show();
        $(".popup-menu",popup).removeClass('active');
        $(this).addClass('active');
      });
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        if (project.view.game.money() < project.getCosts()) {
          lockscreen_cash();
          return this;
        }
        close_popup(popup, function(){
                   project.start();
            });
  });

}
function contact_popup(contact) {
  var s= contact.settings;
  var button_on = false;
  if (!contact.ready && !contact.working){
      button_on=true;
  }
  var tokens = new Array();
  $.each(s.tokens,function(k,v){
      tokens.push(getTokenSettings(v));
  });
  var cdata = {
      id:"cpopup",
      logo:s.logo,
      title:s.title,
      description:s.description,
      button_on:button_on,
      button_text:"Make a Deal",
      button_deco_cash:ksNum(contact.action_cost.toString()),
      button_deco_timer:toTime(contact.action_time),
      amount:ksNum(s.base_amount),
      risk:s.base_risk,
      tokens:tokens
      }
  var cpopup = $('#popupContactTemplate').template('cpopup');
  $.tmpl('cpopup',cdata).hide().appendTo("#canvas_wrap");
  decorate_tokens($('#cpopup'),contact);
  var popup = $('#cpopup');
  open_popup(popup);
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        if (contact.view.game.money() < contact.getCosts()) {
          lockscreen_cash();
          return this;
        }
        close_popup(popup, function(){
                   contact.start();
        });
  });
}

// MERGE DATA FUNCTION
function merge_data(profileset,data,cb) {
  var popid="ps2popup"
  var origin = profileset._origin
  var s=origin.settings;
  var game = origin.view.game;
  var tokens = new Array();
  $.each(profileset.tokens,function(k,v){
      if (v.amount>0) tokens.push(getTokenSettings(v.token_id));
  });

              lockscreen();
              profileset.remove();
              var tokenelems = game.paper.set();
              var db_tokens = game.db_view.profiles.tokens;
              $.each(game.db_view.profiles.tokens,function(k,v){
                  $.each(data.mapping,function(kk,vv){
                    if (v.token_id==vv.type) {
                        if ((v.amount == 0) & (vv.amount > 0)) {
                            // new token
                            v.render();
                            v.makeBar();
                            v.amount=vv.amount;
                            v.update_bar();
                            v.hide();
                         } else if (v.amount>0) {
                            // token exists
                            v.amount=vv.amount;
                            v.update_bar();
                         } else {
                            v.amount=vv.amount;
                         }
                    }
                  });
                  $.each(tokens,function(kk,vv){
                    if (v.token_id==vv.token_id) tokenelems.push(v.elem);
                  });
              });
              $.each(tokenelems,function(k,v){
                 var elem = v;
                 var item = v.item;
                 var center_of_elem = elem.center_of_image();
                 var viewBox=profileset.view.paper._viewBox;
                 var startpoint={x:viewBox[0]+viewBox[2],y:viewBox[1]+62};
                 var tempicon = elem.paper.image('img/icon-profile_s1.png',startpoint.x,startpoint.y,30,30).hide_if_hidden(elem.paper._active_view.active);
                 setTimeout(function(){
                   tempicon.animate({x:center_of_elem.x-16,y:center_of_elem.y-16},400,"<>",function(){
                     tempicon.animate({'opacity':0,'transform':'s3'},200,function(){
                       item.view._rawelems = _.without(item.view._rawelems, tempicon);
                       tempicon.remove();
                       item.show();
                       v.animate({'transform':"s1.2"},50,function(){
                         v.animate({'transform':"s1"},100,"bounce");
                       });

                     });
                   });
                 },k*50);
              });
              // DO FANCY SHIT HERE:
              //console.log('show me',data.increment,data.dup,tokenelems.length*150);
              var DBINC = $("<div class='profiles_inc hidden'>"+ ksNum(data.increment) +"<span style='font-size:32px;'> New Profiles</span></div>");
              var DBDUP = $("<div class='profiles_dup hidden'>"+ ksNum(data.dup) +" Updated</div>");
              $('#lockscreen').append(DBINC,DBDUP);
              //DBINC.delay(100).fadeIn(100);
              //DBDUP.delay(300).fadeIn(100);
              DBINC.delay(100).show('scale',200);
              DBDUP.delay(300).show('scale',200);
              var dur = (tokenelems.length*150 < 1800) ? 1800 : tokenelems.length*150;
              setTimeout(function(){
                    // END OF MERGE
                    game.bars.setProfiles(data.amount);
                    eve('bar.update.value', profileset.view.paper, 'xp_bar', 1);
                    DBINC.hide('puff', { percent: 200 },150);
                    DBDUP.delay(100).hide('puff', { percent: 200 },150);
                    unlockscreenFade();
                    if (cb) cb();
                  },dur);

}


// MERGE POPUP 1
function profileset_popup(profileset,pselem) {
  var origin = profileset._origin
  var s=origin.settings;
  var button_on = true;
  var tokens = new Array();
  var game = origin.view.game;
  var dbtokens = _.pluck(game.db_view._tokens(), 'token_id');

  $.each(profileset.tokens,function(k,v){
      if (v.amount>0) {
        var addtoken = {
          notnew : _.contains(dbtokens,v.token_id),
          settings : getTokenSettings(v.token_id)
        }
        tokens.push(addtoken);
      }
  });

  //var AP = Math.max(profileset.getProfileNumber().toString().length-3,1)
  // AP cost only 1 from now on
  var AP = 1;
  profileset.action_AP=parseInt(AP);
  var psdata = {
      id:"pspopup",
      logo:s.logo,
      title:ksNum(profileset.getProfileNumber())+" Profiles",
      subtitle:s.title,
      description:"All these new profiles need to be integrated into your main database. If you already have information on some of these people, your database will try to identify and update existing profiles using complicated mathematical methods.",
      button_on:button_on,
      button_text:"Import",
      button_deco_AP:AP,
      //button_deco_timer:toTime(contact.action_time),
      amount:ksNum(profileset._anzahl),
      //risk:s.base_risk,
      tokens:tokens
      }
  var pspopup = $('#popupProfilesetTemplateNew').template('pspopup');
  $.tmpl('pspopup',psdata).hide().appendTo("#canvas_wrap");
  decorate_tokens($('#pspopup'),profileset);
  var popup = $('#pspopup');
  open_popup(popup);
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  var data = new Object;
  data.db_map = game.db_view.profiles.getValues();
  data.db_amount = game.profiles();
  data.db_max = game.bars.bars.profile_bar.maximum;
  data.profileset_map = profileset.getValues();
  data.profileset_amount = profileset.getProfileNumber();
  var args = {args: JSON.stringify(data)};

  $(".button",popup).click(function(){
        if (profileset.view.game.bars.getAP() < AP) {
          lockscreen_AP();
          return this;
        }
        // remove button to prevent retrigger of ajax call
        $(this).parent().parent().remove();

        var merger = new Merger(data);
        data = merger.merge();
        //merger.compare(MERGE_URL, data);

        lockscreen();
        close_popup_fast(popup,function(){
             var start=profileset.start();
             if (!start) {
                unlockscreen();
                return false;
             }
             merge_data(profileset,data,function(){
               // MERGE POPUP 1 CLOSE
               // CALL NEXT POPUP AS CALLBACK TO MERGE FUNCTION
               //profileset_popup2(profileset,data);
             });
        });
        return;
  });

}

// MERGE POPUP 2
function profileset_popup2(profileset,data) {
  var popid="ps2popup"
  var origin = profileset._origin
  var s=origin.settings;
  var game = origin.view.game;
  var tokens = new Array();
  $.each(profileset.tokens,function(k,v){
      if (v.amount>0) tokens.push(getTokenSettings(v.token_id));
  });
  var ps2data = {
      id:'ps2popup',
      title:"Positive",
      subtitle:ksNum(data.amount)+" Profiles integrated",
      description:'Your database has been successfully  updated. You gained '+ ksNum(data.increment) +' new profiles. '+ ksNum(data.dup)+' existing profiles were identified and updated with new attributes.',
      amount:ksNum(data.increment),
      amount_dup:ksNum(data.dup),
      button_text:"OK",
      button_on:true,
      tokens:tokens
      }
  var popup = $('#popupProfileset2Template').template(popid);
  $.tmpl(popid,ps2data).hide().appendTo("#canvas_wrap");
  var popup = $("#"+popid);
  decorate_tokens(popup,profileset.view.game.db_view.profiles);
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  open_popup(popup,function(){
      var pp = $(".popup",popup);
      pp.css({'top':(640-pp.height())/2+68})
  });
  $(".button",popup).click(function(){
        close_popup(popup, function(){
        eve('bar.update.value', profileset.view.paper, 'xp_bar', 1);
        });
  });
}



function customer_popup(customer) {
  var s= customer.settings;
  var amount=customer.getIncome();;

  var tokens_in = new Array();
  var tokens_out = new Array();
  $.each(s.tokens_in,function(k,v){
      tokens_in.push(getTokenSettings(v));
  });
  $.each(s.tokens_out,function(k,v){
      tokens_out.push(getTokenSettings(v));
  });
  var button_on = false;
  if (!customer.ready && !customer.working){
      button_on=true;
  }
  var basecash=s.action_income;

  var cdata = {
      id:"cpopup",
      logo:s.logo,
      title:s.title,
      amount:ksNum(amount),
      description:s.description,
      button_on:button_on,
      button_text:"Make a Deal",
      button_deco_AP:customer.action_AP.toString(),
      button_deco_timer:toTime(customer.action_time),
      tokens_in:tokens_in,
      tokens_out:tokens_out
      //button_deco_AP:"2",
      //button_deco_timer:"0:15"
      }
  var cpopup = $('#popupCustomerTemplate').template('cpopup');
  $.tmpl('cpopup',cdata).hide().appendTo("#canvas_wrap");
  decorate_tokens($('#cpopup'),customer.view.game.db_view.profiles);
  var popup = $('#cpopup');
  open_popup(popup);
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        if (customer.view.game.bars.getAP() < customer.action_AP) {
          lockscreen_AP();
          return this;
        }
        close_popup(popup, function(){
                   customer.start();
        });
  });
}

function token_inset_popup(token_id,elem,source) {
  var s=getTokenSettings(token_id);
  var popid=token_id;
  var profileset=undefined;
  var origin=undefined;
  if (source.className=='ProfileSet') profileset=source;
  if (source.className=='ContactElement' || source.className=='ProjectElement') origin=source;
  var stats_text;
  if (profileset) {
      if (profileset._origin) stats_text=s.origin_stats_text;
      if (!profileset._origin) stats_text=s.stats_text;
      var token = profileset.getTokenById(token_id);
      var stats=ksNum(Math.round(profileset.getProfileNumber()/100*token.amount));
  } else if (origin) {
      stats_text=s.origin_stats_text;
      var stats=ksNum(origin.getAmount());
  }
  //var stats=ksNum(1000);
  var data = {
      id:popid,
      //logo:s.logo,
      logo:s.logo,
      title:s.title,
      stats:stats,
      stats_text:stats_text,
      description:s.description,
      button_text:"OK",
      }
  var popup = $('#popupInsetTemplate').template(popid);
  $.tmpl(popid,data).hide().appendTo(".popup-token-set");
  var popup = $("#"+token_id);
  popup.show('scale',{origin:[elem.position().top+45,elem.position().left+45]},100);
  $(".inset-popup-close",popup).click(function(){
    popup.hide('scale',{origin:[elem.position().top+45,elem.position().left+45]},200,function(){
        popup.remove();
    });
  });
  $(".inset-button",popup).click(function(){
    popup.hide('scale',{origin:[elem.position().top+45,elem.position().left+45]},200,function(){
        popup.remove();
    });
  });
}


function token_info_popup(token_id,token) {
  var stats=ksNum(Math.round(token.view.game.bars.bars.profile_bar.value/100*token.amount));
  var s= getTokenSettings(token_id);
  var popid=token_id+"popup"
  var data = {
      id:popid,
      logo:s.logo,
      title:s.title,
      stats_text:s.stats_text,
      stats:stats,
      description:s.description,
      button_text:"OK",
      }
  var popup = $('#popupTokenTemplate').template(popid);
  $.tmpl(popid,data).hide().appendTo("#canvas_wrap");
  var popup = $("#"+popid);
  open_popup(popup,function(){
      var pp = $(".popup",popup);
      pp.css({'top':(640-pp.height())/2+68})
  });
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        close_popup(popup, function(){
        });
  });
}

function statusbar_popup(bar) {
  if (bar.id=="profile_bar") {
    var data = {
      id:"popup",
      logo:"img/statusbar/popup-profile_s1.png",
      title:"Status",
      subtitle:"You've captured "+ksNum(bar.value)+" of "+ksNum(bar.maximum)+" available people in your database.",
      description:"Collect even more profiles! Take care: \"Collecting\" is only half the battle. You need to import all of the newly collected profiles into your database. And don’t forget: Every dirty detail counts. The more complete your database, the more it’s worth.",
      button_text:"OK",
      }
  } else if (bar.id=="money_bar") {
    var data = {
      id:"popup",
      logo:"img/statusbar/popup-cash_s1.png",
      title:"Cash",
      subtitle:"Your current balance: $"+ksNum(bar.value),
      description:"Whether you need to buy from the underground market or upgrade your companies and online ventures, it’s all about the green, yo. Make deals with your customers regularly to stay out of the red and prevent your data empire from losing ground.",
      button_text:"OK",
      }
  } else if (bar.id=="ap_bar") {
    var data = {
      id:"popup",
      logo:"img/statusbar/popup-ap_s1.png",
      title:"Energy",
      subtitle:"Your current energy level: "+bar.value+"/"+bar.maximum,
      description:"Each day only has 24 hours, and your energy is limited – make it count! But don’t worry if it runs out. Just wait a little, and soon you’ll be fit as a fiddle again. If you make it to the next level, the rush of endorphins will also pep you right up anyway.",
      button_text:"OK",
      }
  } else if (bar.id=="image_bar") {
    var data = {
      id:"popup",
      logo:"img/statusbar/popup-risk_s1.png",
      title:"Risk",
      subtitle:"Your current risk factor: "+bar.value+"%",
      description:"Not always on the right side of the law during your data-gathering adventures? A bit on the risky side, right? If your risk factor gets too high, the public, concerned citizens’ brigades and privacy nuts might start breathing down your neck. However, there’s no problem you can’t solve.",
      button_text:"OK",
      }
  } else if (bar.id=="xp_bar") {
    var data = {
      id:"popup",
      logo:"img/statusbar/popup-xp_s1.png",
      title:"Level",
      subtitle:"Your current game level: "+bar.level,
      description:"Each of your actions earns you experience. <br />To get to the next level you still need "+ (bar.maximum-bar.value+1) +" XP.",
      button_text:"OK",
      }
  }
  else {
      return this;
  }
  var popup = $('#popupTemplate').template('popup');
  $.tmpl('popup',data).hide().appendTo("#canvas_wrap");
  var popup = $('#popup');
  open_popup(popup,function(){
      var pp = $(".popup",popup);
      pp.css({'top':(640-pp.height())/2+68})
  });
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        close_popup(popup, function(){
        });
  });
}

function protest_popup(view, amount) {
  var data = {
      id:"popup",
      logo:'img/protests-logo.png',
      title:'Protests against data abuse',
      subtitle:'There seems to be a little problem.',
      description:"A small group of unrelenting privacy advocates has succeeded in inciting the populace against you. You’ve been a little careless lately and did too much risky trading.<br /><br />A brief image campaign will cost you a few bucks, but there’s really no avoiding it. Or would you rather end up in the pokey?",
      button_text:'Pay',
      button_deco_cash:ksNum(amount)
      }
  var popup = $('#popupProtestTemplate').template('popup');
  $.tmpl('popup',data).hide().appendTo("#canvas_wrap");
  var popup = $('#popup');
  open_popup(popup,function(){
      var pp = $(".popup",popup);
      pp.css({'top':(640-pp.height())/2+68})
  });
  $(".button",popup).click(function(){
        close_popup(popup, function(){
              eve('bar.update.value', view.paper, 'money_bar', -amount);
              eve('bar.update.value', view.paper, 'xp_bar', 1);
              eve('bar.update.value', view.paper, 'image_bar', -(Math.round(Math.random()*10)+40) );
        });
  });
}




function agent_popup(item) {
  var s= item.settings;
  var data = {
      id:"popup",
      logo:s.logo,
      title:s.title,
      subtitle:s.subtitle,
      description:s.description,
      button_text:"OK",
      }
  var popup = $('#popupTemplate').template('popup');
  $.tmpl('popup',data).hide().appendTo("#canvas_wrap");
  var popup = $('#popup');
  open_popup(popup,function(){
      var pp = $(".popup",popup);
      pp.css({'top':(640-pp.height())/2+68})
  });
  $(".popup-close",popup).click(function(){
        close_popup(popup);
  });
  $(".button",popup).click(function(){
        close_popup(popup, function(){
        });
  });
}

// FIXME: Exposing methods needed in templates to global scope.
window.getTokenSettings = getTokenSettings;
window.ksNum = ksNum;
