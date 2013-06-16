var W = 1920;
var H = 1280;
var VPW = 960;
var VPH = 640;
var SHIFTX = (W-VPW)/2;
var SHIFTY = (H-VPH)/2;

var MERGE_URL = 'http://proto.datadealer.net/dbmerge'

var STATUS_BAR_FONT = {'font':'16px Bowlby', 'fill': '#fff','stroke':'#666','stroke-opacity':0.8};
var LABEL_FONT = {'font':'12px Bowlby', 'fill': '#010','opacity':0.5};
var DB_LABEL_FONT = {'font':'12px Bowlby', 'fill': '#010','opacity':0.5};
var BAR_NUMBER_FONT = {'font':'14px Voltaire','fill': '#FFF','stroke':'#FFF','stroke-width':0.5};
var TIMER_FONT = {'font':'11px Bowlby', 'fill': '#7F3187'};
var MONEY_FONT = {'font':'13px Bowlby', 'fill': '#5DA445','stroke':'#FFF','stroke-width':2};
var PROFILE_FONT = {'font':'13px Bowlby', 'fill': '#009FD9','stroke':'#FFF','stroke-width':2};
var CONN_IN = {'stroke':'#16A3D7','stroke-width':6,'stroke-linecap':'round'};
var CONN_OUT = {'stroke':'#E85E2B','stroke-width':6,'stroke-linecap':'round'};

var project_texts = {
  upgrades:"<span class='blue'>Upgrade your ventures!</span><br />Choose between several upgrades to gain more profiles, additional attributes or other advantages. Just be careful: well-developed data mines are more expensive to maintain.",
  actions:"<span class='blue'>Advertising is everything!</span><br />Plaster events with your logo or buy yourself a celeb. And don’t forget to make use of online and viral marketing alongside classic ad campaigns.<br />Just be careful: ad campaigns require constant funding.",
  team:"<span class='blue'>Assemble your team!</span><br />Choosing the right people for the job is hard work and doesn’t always come cheap. Then once you’ve finally got them, the bloodsuckers demand regular wages, too. Annoying, but still necessary to get your empire off the ground."
};


var db_data = [];
var db_profileset = [
    {
        type:'vorname',
        amount: 100
    },
    {
        type:'nachname',
        amount: 100
    },
    {
        type:'adresse',
        amount: 100
    },
    {
        type:'wohnort',
        amount: 100
    },
    {
        type:'telefonnummer',
        amount: 80
    },
    {
        type:'geburtsdatum',
        amount: 90
    },
    {
        type:'geschlecht',
        amount: 90
    },
    {
        type:'email',
        amount: 50
    },
    {
        type:'personalakten',
        amount: 0.52
    },
    {
        type:'lebenslauf',
        amount: 0.52
    },
    {
        type:'besuchteschulen',
        amount: 0.52
    },
    {
        type:'einkommen',
        amount: 0.5
    },
    {
        type:'schulden',
        amount: 0.5
    },
    {
        type:'konsumgewohnheiten',
        amount: 0
    },
    {
        type:'bevorzugtecomputergames',
        amount: 0
    },
    {
        type:'gewicht',
        amount: 0
    },
    {
        type:'koerpergroesse',
        amount: 0
    },
    {
        type:'ernaehrungsweise',
        amount: 0
    },
    {
        type:'krankenakte',
        amount: 0
    },
    {
        type:'chronischekrankheiten',
        amount: 0
    },
    {
        type:'anzahldersolarienbesuche',
        amount: 0
    },
    {
        type:'alterbeimerstenmal',
        amount: 0
    },
    {
        type:'beziehungsstatus',
        amount: 0
    },
    {
        type:'sexuelleorientierung',
        amount: 0
    },

    {
        type:'partyfotos',
        amount: 0
    },
    {
        type:'iq',
        amount: 0
    },
    {
        type:'vertrauenswuerdigoderunzuverlaessig',
        amount: 0
    },
    {
        type:'zufriedenoderfrustriert',
        amount: 0
    },
    {
        type:'passwoerter',
        amount: 0
    },
    {
        type:'kreditkartennummer',
        amount: 0
    },
    {
        type:'ipadresse',
        amount: 0
    },
    {
        type:'politischeeinstellung',
        amount: 0
    },
]
var agent_data = [
  {
    x: 860,
    y: 250,
    font_attr: LABEL_FONT,
    label: 'Barnie Maddog',
    title: 'Barnie Maddog',
    subtitle:'knows the big shots in politics',
    description:'Whether they\'re politicians or bureaucrats, serve on boards or with the police: Barnie Maddog knows them all. Or else he knows someone who does. After all, he was a very important man for many years. Those days may be long gone, but he can still hook you up with lots of interesting people who have access to some especially juicy tidbits. <br /><br />The government has its fingers in a lot of pies, and is therefore a good source for all sorts of personal information you can\'t get anywhere else – especially not of this quality. And there\'s another good thing about Mr. Maddog: he\'s exceptionally motivated to work for you ever since you found out some, uh, awkward details about his past. In turn, he knows some compromising things about...',
    data_id:'ernstkrasser',
    sprite_w: 144,
    sprite_h: 144, 
    logo: 'img/agent-krasser-logo.png',
    sprite_img: 'img/agent-krasser_s1.png',
    sprite_img_down: 'img/agent-krasser-down_s1.png',
    sprite_img_hover: 'img/agent-krasser-hover_s1.png',
    sprite_img_drag: 'img/agent-krasser-drag_s1.png',
    ready: false,
    contact_data:[
        {
            x: 680,
            y: 210,
            font_attr: LABEL_FONT,
            label: 'Beverly\nCompton-Burr',
            title: 'Beverly Compton-Burr',
            description:'Beverly Compton-Burr works at the Department of Education and heads the division that manages the fancy new central student database – storing all the minute details of each and every student file, to "simplify administration." She earns good money, but she may have gotten in a little over her head with that new penthouse suite...',
            data_id:'sieglindebayerwurtz',
            logo: 'img/kontakt-sigrun-logo.png',
            sprite_w: 118,
            sprite_h: 118, 
            sprite_img: 'img/kontakt-sigrun_s1.png',
            sprite_img_down: 'img/kontakt-sigrun-down_s1.png',
            sprite_img_hover: 'img/kontakt-sigrun-hover_s1.png',
            sprite_img_drag: 'img/kontakt-sigrun-drag_s1.png',
            action_cost: 170,
            action_time: 30000,
            base_amount: 22000,
            base_risk: 1,
            tokens:[
              'vorname',
              'nachname',
              'geburtsdatum',
              'geschlecht',
              'besuchteschulen'
            ]
        },
        {
            x: 1020,
            y: 180,
            font_attr: LABEL_FONT,
            label: 'Paul Peeves',
            title: 'Paul Peeves',
            description:'For thirty years, Paul Peeves has been doing foreclosures and has long grown sick of visiting those poor, heavily indebted bastards, hauling away their TVs, computers and cars. No surprise he\'s turned a little cynical (can you say “burnout”?) If you soothe his pain with a few bucks, he\'ll gladly send you the details on his "customers" - and those of a few associates as well.',
            data_id:'franzsauerzapf',
            logo: 'img/kontakt-franzsauerzapf-logo.png',
            sprite_w: 118,
            sprite_h: 118, 
            sprite_img: 'img/kontakt-franzsauerzapf_s1.png',
            sprite_img_down: 'img/kontakt-franzsauerzapf-down_s1.png',
            sprite_img_hover: 'img/kontakt-franzsauerzapf-hover_s1.png',
            sprite_img_drag: 'img/kontakt-franzsauerzapf-drag_s1.png',
            action_cost: 200,
            action_time: 40000,
            base_amount: 30000,
            base_risk: 3,
            tokens:[
              'vorname',
              'nachname',
              'geburtsdatum',
              'geschlecht',
              'adresse',
              'wohnort',
              'schulden'
            ]
        }


    ]
  },
  {
    x: 678,
    y: 655,
    font_attr: LABEL_FONT,
    label: 'Manny Mayer',
    title: 'Manny Mayer',
    data_id:'mannymayer',
    logo:"img/agent-manni-logo.png",
    subtitle:"is a private detective and an old friend",
    description:"Years ago he solved a few spectacular cases, scored some primetime news coverage and basked in his success like it was a tanning bed. But the good old days are over, and Manny could really do with some new business. On top of everything else, a big client just ripped him off. The result: Manny is broke, frustrated and hungry for revenge. That’s his department! <br /><br />And  so he became something of an expert in sniffing out low-level clerks in departments or companies who have something in common with him: they’re broke, frustrated, and hungry for revenge. Ha! A few of his acquaintances deal with some pretty personal data at the office. And with full access, too - how else could they do their job? For just a little cash, they’ll get you some tasty bits and pieces for your database.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/agent-manni_s1.png',
    sprite_img_down: 'img/agent-manni-down_s1.png',
    sprite_img_hover: 'img/agent-manni-hover_s1.png',
    sprite_img_drag: 'img/agent-manni-drag_s1.png',
    ready: false,
    //initial:true,
    contact_data : [{
            x: 826,
            y: 777,
            font_attr: LABEL_FONT,
            label: 'Nurse Mildred',
            title: 'Nurse Mildred',
            data_id:'schwesterelfriede',
            logo:"img/kontakt-ks-logo.png",
            description:"Nurse Mildred works at the county’s largest hospital. For 20 years she’s slaved away in the sick ward. Now her hours have been increased and her wages cut. Incidentally, she’s got full access to the hospital’s central database. She needs the money, and would be willing to supply you with reliable data on her patients’ health status.",
            sprite_w: 118,
            sprite_h: 118, 
            sprite_img: 'img/kontakt-ks_s1.png',
            sprite_img_down: 'img/kontakt-ks-down_s1.png',
            sprite_img_hover: 'img/kontakt-ks-hover_s1.png',
            sprite_img_drag: 'img/kontakt-ks-drag_s1.png',
            ready: true,
            action_cost: 150,
            action_time: 40000,
            base_amount: 12000,
            base_risk: 1,
            tokens:['vorname',
                    'nachname',
                    'adresse',
                    'wohnort',
                    'geburtsdatum',
                    'geschlecht',
                    'telefonnummer',
                    'gewicht',
                    'koerpergroesse',
                    'krankenakte',
                    'chronischekrankheiten'
                    ]
        },
        {
            x: 611,
            y: 826,
            font_attr: LABEL_FONT,
            label: 'Steve Sneak',
            title: 'Steve Sneak',
            data_id:'stephanpetzold',
            description: 'Day in, day out, you can find Steve Sneak in a run-down branch of a large tanning chain, cleaning toxic sweat off the glassy barbecue booths every hour. The computer at the front desk holds details on all sunning sessions, including their length and the device model used. For six bucks an hour and no sick leave, Steve can\'t afford to be too discrete...',
            logo:"img/kontakt-solarium-logo.png",
            sprite_w: 118,
            sprite_h: 118, 
            sprite_img: 'img/kontakt-solarium_s1.png',
            sprite_img_down: 'img/kontakt-solarium-down_s1.png',
            sprite_img_hover: 'img/kontakt-solarium-hover_s1.png',
            sprite_img_drag: 'img/kontakt-solarium-drag_s1.png',
            ready: false,
            action_cost: 100,
            action_time: 30000,
            base_amount: 9000,
            base_risk: 1,
            tokens:['vorname',
                    'nachname',
                    'adresse',
                    'wohnort',
                    'geburtsdatum',
                    'geschlecht',
                    'telefonnummer',
                    'email',
                    'anzahldersolarienbesuche'
                    ]
        }
    ]
},{
    x: 508,
    y: 587,
    font_attr: LABEL_FONT,
    label: 'Mara Loft',
    title: 'Mara Loft',
    data_id:'maraloft',
    subtitle: 'knows the hacker community like the back of her hand',
    logo:"img/agent-maraloft-logo.png",
    description:"You’ve never met her and there’s little you know about her. You have no idea how to contact her, either. She contacts you. Via encrypted email. Then disappears once more. Loft is a phantom, and yet one of your most valuable resources. She’s in contact with some shadowy circles where large packets of delicate data are sold for a song. Where the files come from? You don’t really want to know. One thing is clear: Not even big companies manage to secure their systems well enough. Eventually someone hacks their way in and siphons something off. Loft’s sources are cautious, even a little paranoid at times. But if you prove you can be trusted and show them some love now and then, they might just warm up to you.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/agent-generic_s1.png',
    sprite_img_down: 'img/agent-generic-down_s1.png',
    sprite_img_hover: 'img/agent-generic-hover_s1.png',
    sprite_img_drag: 'img/agent-generic-drag_s1.png',
    ready: false,
    contact_data : [{
            x: 452,
            y: 767,
            font_attr: LABEL_FONT,
            label: 'Uncle Enzo',
            title: 'Uncle Enzo',
            data_id:'onkelenzo',
            logo:"img/contact-enzo-logo.png",
            description:"He calls himself Uncle Enzo and claims to have hacked into the online network of a global game console provider. Says it was pretty easy, too. He’s not just offering names and addresses, but passwords, credit card numbers and game lists. All in all, he’s sitting on almost a million data sets for your country alone – you really need to get your hands on those!",
            sprite_w: 118,
            sprite_h: 118, 
            sprite_img: 'img/contact-enzo_s1.png',
            sprite_img_down: 'img/contact-enzo-down_s1.png',
            sprite_img_hover: 'img/contact-enzo-hover_s1.png',
            sprite_img_drag: 'img/contact-enzo-drag_s1.png',
            ready: true,
            action_cost: 500,
            action_time: 60000,
            base_amount: 50000,
            base_risk: 5,
            tokens:['vorname',
                    'nachname',
                    'adresse',
                    'wohnort',
                    'geburtsdatum',
                    'geschlecht',
                    'telefonnummer',
                    'email',
                    'ipadresse',
                    'passwoerter',
                    'kreditkartennummer',
                    'bevorzugtecomputergames'
                    ]
        }
        
        ]
    }
]

var customer_data = [
{
    x: 1142,
    y: 800,
    font_attr: LABEL_FONT,
    label: 'Star Mart',
    title: 'Star Mart',
    data_id:'diebahn',
    logo:"img/customer-bahn-logo_s1.png",
    description:"We’re one of the country’s biggest employers. Consequently, our human resources department needs to process thousands of applications every year, ranging from apprentices to managers. We need some background information on our current and future employees so we can sort out the bad eggs more easily.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/customer-bahn_s1.png',
    sprite_img_down: 'img/customer-bahn-down_s1.png',
    sprite_img_hover: 'img/customer-bahn-hover_s1.png',
    sprite_img_drag: 'img/customer-bahn-drag_s1.png',
    ready: false,
    action_AP: 2,
    action_time: 30000,
    base_income: 140,
    base_income_factor: 100,
    tokens_in:['vorname','nachname','geburtsdatum'],
    tokens_out:[
      'lebenslauf',
      'personalakten',
      'besuchteschulen',
      'vertrauenswuerdigoderunzuverlaessig',
      'zufriedenoderfrustriert',
      'iq',
      'partyfotos',
      'bevorzugtecomputergames',
      'politischeeinstellung'
    ]
},
{
    x: 1000,
    y: 688,
    font_attr: LABEL_FONT,
    label: 'Health Insurance\nCompany',
    title: 'Health Insurance',
    data_id:'krankenversicherung',
    logo:"img/customer-versicherung-logo_s1.png",
    description:"Great coverage, low deductible, of course they all want our policy! People are terrified of what could happen if worse came to worst, so we can be choosy. But some diseases cost us a pretty penny, and we’d rather avoid that. Before we take on someone new, we need information, like pre-existing conditions and risky behaviors, so we can decide how much we’ll make them pay for the honor.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/customer-versicherung_s1.png',
    sprite_img_down: 'img/customer-versicherung-down_s1.png',
    sprite_img_hover: 'img/customer-versicherung-hover_s1.png',
    sprite_img_drag: 'img/customer-versicherung-drag_s1.png',
    ready: false,
    action_AP: 2,
    action_time: 45000,
    base_income: 180,
    base_income_factor: 100,
    tokens_in:['vorname','nachname','geschlecht','geburtsdatum'],
    tokens_out:[
      'gewicht',
      'koerpergroesse',
      'krankenakte',
      'chronischekrankheiten',
      'ernaehrungsweise',
      'anzahldersolarienbesuche'
    ]
},

{
    x: 1300,
    y: 770,
    font_attr: LABEL_FONT,
    label: 'National Rental \nHousing',
    title: 'National Rental Housing',
    data_id:'mobilfunkdiskonter',
    logo:"img/customer-ratpull-logo_s1.png",
    description:"Our members own a plenty of houses and apartments – and they would really like to \“get to know\“ their new tenants a little better. People who live beyond their means or – heaven forbid – are in debt are much too troublesome. They won’t take those – nobody will.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/customer-ratpull_s1.png',
    sprite_img_down: 'img/customer-ratpull-down_s1.png',
    sprite_img_hover: 'img/customer-ratpull-hover_s1.png',
    sprite_img_drag: 'img/customer-ratpull-drag_s1.png',
    ready: true,
    action_AP: 1,
    action_time: 20000,
    base_income: 110,
    base_income_factor: 100,
    tokens_in:['vorname','nachname','adresse','wohnort','geburtsdatum'],
    tokens_out:['einkommen','schulden','konsumgewohnheiten','vertrauenswuerdigoderunzuverlaessig']
},


{
    x: 960,
    y: 870,
    font_attr: LABEL_FONT,
    label: 'Central Security\nAgency',
    title: 'Central Security Agency',
    data_id:'centralsecurity',
    logo:"img/customer-ministerium-logo_s1.png",
    description:"Long ago we needed to go on all those cumbersome stakeouts, spying on people using bugs and binoculars. And now? People offer us their whole lives on a silver platter! All that digital data is a real goldmine. During our online investigations we keep coming across anonymous email addresses. If only we knew who’s really behind them…",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/customer-ministerium_s1.png',
    sprite_img_down: 'img/customer-ministerium-down_s1.png',
    sprite_img_hover: 'img/customer-ministerium-hover_s1.png',
    sprite_img_drag: 'img/customer-ministerium-drag_s1.png',
    ready: false,
    action_AP: 2,
    action_time: 90000,
    base_income: 20,
    base_income_factor: 50,
    tokens_in:['email'],
    tokens_out:['vorname','nachname','geburtsdatum','adresse','wohnort','ipadresse','passwoerter','politischeeinstellung','zufriedenoderfrustriert','bevorzugtecomputergames','lebenslauf']
}

]

var team = {
    manager: {
        title:"Manager",
        description:"Burning the midnight oil? Hire a manager to do the dirty work for you and get your team’s ass in gear!",
        logo:"img/team/manager_s1.png",
        logo_big:"img/team/manager-big_s1.png"
        },
    managerin: {
        title:"Manager",
        description:"You can’t do it all by yourself! It’s good to have someone in charge while you do the really important things like counting all the money you’re making.",
        logo:"img/team/managerin_s1.png",
        logo_big:"img/team/managerin-big_s1.png"
        },
    werbefuzzi: {
        title:"Ad hottie",
        description:"Your business runs on advertising, so you better hire some professionals. They’ll melt people’s brains without them even noticing.",
        logo:"img/team/werbefuzzi_s1.png",
        logo_big:"img/team/werbefuzzi-big_s1.png"
        },
    psychologin: {
        title:"Psychologist",
        description:"Not everyone willingly hands over their data. Insights from behavioral research might come in handy. And a little manipulation never hurts.",
        logo:"img/team/psychologin_s1.png",
        logo_big:"img/team/psychologin-big_s1.png"
        },
    student: {
        title:"Trainee",
        description:"Trainees are highly qualified and still cheaper by the dozen. Put them to good use and they’ll raise your general performance.",
        logo:"img/team/student_s1.png",
        logo_big:"img/team/student-big_s1.png"
        },
    studentin: {
        title:"Trainee",
        description:"Trainees are highly qualified and still cheaper by the dozen. Put them to good use and they’ll raise your general performance.",
        logo:"img/team/studentin_s1.png",
        logo_big:"img/team/studentin-big_s1.png"
        },
    psychologe: {
        title:"Psychologist",
        description:"Not everyone willingly hands over their data. Insights from behavioral research might come in handy. And a little manipulation never hurts.",
        logo:"img/team/psychologe_s1.png",
        logo_big:"img/team/psychologe-big_s1.png"
        },
    anwalt: {
        title:"Lawyer",
        description:"Just to be on the safe side during your data gathering, you should get yourself a good lawyer. Just someone to check your tricky phrasing and sue the pants off your critics...",
        logo:"img/team/anwalt_s1.png",
        logo_big:"img/team/anwalt-big_s1.png"
        },
    grafiker: {
        title:"Graphic designer",
        description:"Style your project from top to bottom to ensure a smashing success. You just need one of those graphic whiz kids who knows what people want to see.",
        logo:"img/team/grafiker_s1.png",
        logo_big:"img/team/grafiker-big_s1.png"
        },
    grafikerin: {
        title:"Graphic designer",
        description:"Style your project from top to bottom to ensure a smashing success. You just need one of those graphic whiz kids who knows what people want to see.",
        logo:"img/team/grafikerin_s1.png",
        logo_big:"img/team/grafikerin-big_s1.png"
        },
    programmierer: {
        title:"Programmer",
        description:"When you’re out gathering data, technology is your friend. You need a good programmer to ensure that no profile is lost or corrupted, and your machine keeps on running smoothly.",
        logo:"img/team/programmierer_s1.png",
        logo_big:"img/team/programmierer-big_s1.png"
        },
    programmierer2: {
        title:"Programmer",
        description:"When you’re out gathering data, technology is your friend. You need a good programmer to ensure that no profile is lost or corrupted, and your machine keeps on running smoothly.",
        logo:"img/team/programmierer2_s1.png",
        logo_big:"img/team/programmierer2-big_s1.png"
        },
    forscherin: {
        title:"Researcher",
        description:"You need to stay one step ahead of the competition. Upgrading your research department doesn’t come cheap, but it will soon pay for itself.",
        logo:"img/team/forscherin_s1.png",
        logo_big:"img/team/forscherin-big_s1.png"
        },
    praktikant: {
        title:"Student",
        description:"Students may not be as good as trainees, but they have one advantage: They’ll do whatever you want.",
        logo:"img/team/praktikant_s1.png",
        logo_big:"img/team/praktikant-big_s1.png"
        },
    praktikantin: {
        title:"Student",
        description:"Students may not be as good as trainees, but they have one advantage: They’ll do whatever you want.",
        logo:"img/team/praktikantin_s1.png",
        logo_big:"img/team/praktikantin-big_s1.png"
        }
}

var project_data = [{
    x: 609,
    y: 412,
    font_attr: LABEL_FONT,
    label: 'Sweepstakes',
    title: 'Sweepstakes',
    data_id:'gewinnspiel',
    logo:"img/project-gewinnspiel-logo.png",
    description:"Dangle a big fat carrot in front of their nose and they won’t be able to resist! You can rake in the info with an attractive sweepstakes prize. The hotter the ticket, the more suckers will go for it!",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/project-gewinnspiel_s1.png',
    sprite_img_down: 'img/project-gewinnspiel-down_s1.png',
    sprite_img_hover: 'img/project-gewinnspiel-hover_s1.png',
    sprite_img_drag: 'img/project-gewinnspiel-drag_s1.png',
    ready: true,
    action_cost: 10,
    action_time: 20000,
    base_amount: 100,
    base_risk: 2,
    tokens:[
            'vorname',
            'nachname',
            'adresse',
            'wohnort',
            'geburtsdatum',
            'geschlecht',
            'telefonnummer',
            'email'
            ],
    upgrades: [{
        bought:false,
        locked:false,
        id:"g1",
        title:"Logo & Design",
        logo:"img/upgrades/design_s1.png",
        logo_big:"img/upgrades/design-big_s1.png",
        description:"Make it shine! Pimping your venture is the way to go. A slick company design will make it even easier to get customers to part with their data.",
        action_cost: 900,
        bonus_profiles:8000,
        bonus_cost: 20
      },{
        bought:true,
        locked:false,
        id:"g2",
        title:"Win an Aye-Pod!",
        logo:"img/upgrades/gewinn_s1.png",
        logo_big:"img/upgrades/gewinn-big_s1.png",
        description:"Offer some shiny Aye-Pods as prizes in your sweepstakes. You might get better prizes later on, but it’s not shabby for a start.",
        action_cost: 1000,
        bonus_profiles:4900,
        bonus_cost: 90
      },
      {
        bought:false,
        locked:true,
        id:"g5",
        title:"Win a Mystery Dream Cruise!",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:true,
        id:"g7",
        title:"Win a Sports Car!",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:false,
        id:"g3",
        title:"Extra Question: Income",
        logo:"img/upgrades/zusatzfrage_s1.png",
        logo_big:"img/upgrades/zusatzfrage-big_s1.png",
        description:"Try to sneak a question about household income into your entry form– and make it compulsory for winning the grand prize!",
        action_cost: 2200,
        bonus_token:["einkommen"],
        bonus_risk: 2
      },
      {
        bought:false,
        locked:true,
        id:"g6",
        title:"Extra Question: Education",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0,
      },
      {
        bought:false,
        locked:true,
        id:"g8",
        title:"Extra Question: Children",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0,
      },
      {
        bought:false,
        locked:false,
        id:"g4",
        title:"Privacy Policy",
        logo:"img/upgrades/privacy_s1.png",
        logo_big:"img/upgrades/privacy-big_s1.png",
        description:"The longer, more complicated and more trustworthy your Privacy Policy sounds, the faster and more willingly people will open their hearts to you. Who cares whether your \"statement of privacy\" actually states there is none? Who even reads these things?",
        action_cost: 2800,
        bonus_profiles:17000,
        bonus_risk:-1
      }

    ],
    // gewinnspiel werbung
    actions: [
      {
        bought:false,
        locked:false,
        id:"a1",
        title:"Distribute at subway stations",
        logo:"img/actions/smallflyer_s1.png",
        logo_big:"img/actions/flyer-big_s1.png",
        description:"Hire some cute, silver-tongued sales talents and deploy them at the city’s subway stations.",
        action_cost: 800,
        bonus_profiles: 11000,
        bonus_cost: 40
      },
      {
        bought:false,
        locked:false,
        id:"a2",
        title:"Distribute in malls",
        logo:"img/actions/smallflyer_s1.png",
        logo_big:"img/actions/flyer-big_s1.png",
        description:"Hire some cute, silver-tongued sales talents and send them to the country’s biggest malls.",
        action_cost: 2400,
        bonus_profiles: 19000,
        bonus_cost: 60
      },
      {
        bought:false,
        locked:true,
        id:"a3",
        title:"Distribute in restaurants",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:5
      },
      {
        bought:false,
        locked:true,
        id:"a4",
        title:"Newspaper Supplement",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:5
      },
      {
        bought:false,
        locked:false,
        id:"a5",
        title:"Ex-Athlete",
        logo:"img/actions/sportler_s1.png",
        logo_big:"img/actions/sportler-big_s1.png",
        description:"Buy yourself a celeb to promote your business. Ex-athletes are a much better choice than ex-politicians – their status as darlings of the nation means they’re especially well-suited for your purposes.",
        action_cost: 2800,
        bonus_profiles: 28000,
        bonus_cost: 120,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"a6",
        title:"Real estate mogul",
        logo:"img/actions/baumeister_s1.png",
        logo_big:"img/actions/baumeister-big_s1.png",
        description:"Buy yourself a celeb to promote your business! Real estate moguls are a local specialty. Careful though: not suitable for every occasion!",
        action_cost: 900,
        bonus_profiles: 17000,
        bonus_cost: 100,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:true,
        id:"a7",
        title:"TV-Presenter",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:5
      },
      {
        bought:false,
        locked:false,
        id:"a8",
        title:"Paid Postings",
        logo:"",
        logo_big:"",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Get yourself some net slaves who anonymously hail your product. Just have them add a little criticism now and then and nobody will ever guess...",
        action_cost: 800,
        bonus_profiles: 12000,
        bonus_cost: 60,
        bonus_risk: -1
      }
    ],
    team: [
      {
        bought:false,
        locked:false,
        id:"t1",
        title:team.manager.title,
        logo:team.manager.logo,
        logo_big:team.manager.logo_big,
        description:team.manager.description,
        action_cost: 600,
        bonus_profiles: 7000,
        bonus_cost: 40
      },
      {
        bought:false,
        locked:false,
        id:"t2",
        title:team.managerin.title,
        logo:team.managerin.logo,
        logo_big:team.managerin.logo_big,
        description:team.managerin.description,
        action_cost: 500,
        bonus_profiles: 8000,
        bonus_cost: 30
      },
      {
        bought:false,
        locked:false,
        id:"t3",
        title:team.grafikerin.title,
        logo:team.grafikerin.logo,
        logo_big:team.grafikerin.logo_big,
        description:team.grafikerin.description,
        action_cost: 600,
        bonus_profiles: 14000,
        bonus_cost: 70,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"t4",
        title:team.werbefuzzi.title,
        logo:team.werbefuzzi.logo,
        logo_big:team.werbefuzzi.logo_big,
        description:team.werbefuzzi.description,
        action_cost: 800,
        bonus_profiles: 8000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t5",
        title:team.student.title,
        logo:team.student.logo,
        logo_big:team.student.logo_big,
        description:team.student.description,
        action_cost: 90,
        bonus_profiles: 2000,
        bonus_cost: 12
      },
      {
        bought:false,
        locked:false,
        id:"t6",
        title:team.studentin.title,
        logo:team.studentin.logo,
        logo_big:team.studentin.logo_big,
        description:team.studentin.description,
        action_cost: 60,
        bonus_profiles: 3000,
        bonus_cost: 8
      },
      {
        bought:false,
        locked:false,
        id:"t7",
        title:team.psychologin.title,
        logo:team.psychologin.logo,
        logo_big:team.psychologin.logo_big,
        description:team.psychologin.description,
        action_cost: 1200,
        bonus_profiles: 18000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t8",
        title:team.anwalt.title,
        logo:team.anwalt.logo,
        logo_big:team.anwalt.logo_big,
        description:team.anwalt.description,
        action_cost: 800,
        bonus_profiles: 11000,
        bonus_cost: 60,
        bonus_risk: -1
      }
    ]
},
{
    x: 1074,
    y: 409,
    font_attr: LABEL_FONT,
    label: 'Dating Site',
    title: 'Dating Site',
    data_id:'partnerboerse',
    logo:"img/project-partnerboerse-logo.png",
    description:"For the chance to find their soulmate, lonely souls will pour out their hearts to you and let you in on their deepest secrets. Once you line up email-addresses and pseudonyms with the real names, things start to get interesting.",
    sprite_w: 144,
    sprite_h: 144, 
    sprite_img: 'img/project-partnerboerse_s1.png',
    sprite_img_down: 'img/project-partnerboerse-down_s1.png',
    sprite_img_hover: 'img/project-partnerboerse-hover_s1.png',
    sprite_img_drag: 'img/project-partnerboerse-drag_s1.png',
    ready: false,
    action_cost: 130,
    action_time: 40000,
    base_amount: 100,
    base_risk: 3,
    tokens:[
            'geburtsdatum',
            'geschlecht',
            'telefonnummer',
            'email',
            'beziehungsstatus',
            'sexuelleorientierung',
            'alterbeimerstenmal',
            'politischeeinstellung'
        ],
    upgrades: [{
        bought:true,
        locked:false,
        id:"p1",
        title:"Logo & Design",
        logo:"img/upgrades/design_s1.png",
        logo_big:"img/upgrades/design-big_s1.png",
        description:"Make it shine! Pimping your venture is the way to go. A slick company design will make it even easier to get customers to part with their data.",
        action_cost: 2500,
        bonus_profiles: 7900,
        bonus_cost: 20
      },{
        bought:false,
        locked:false,
        id:"p2",
        title:"Technology",
        logo:"img/upgrades/technik_s1.png",
        logo_big:"img/upgrades/technik-big_s1.png",
        description:"Keep your users entertained – offer some new toys and tricks to stave off boredom.",
        action_cost: 1300,
        bonus_profiles: 9000,
        bonus_cost: 20
      },
      {
        bought:false,
        locked:true,
        id:"p3",
        title:"Fake Profiles",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:true,
        id:"p4",
        title:"Banner Ad",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:true,
        id:"p5",
        title:"Partner Matching Tests",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:false,
        id:"p6",
        title:"Premium Membership",
        logo:"img/upgrades/premium_s1.png",
        logo_big:"img/upgrades/premium-big_s1.png",
        description:"Once you’ve collected enough profiles, you can start making big money on membership fees. The additional info you get from people’s payment details, like reliable names and addresses, is really just the icing on the cake.",
        action_cost: 2400,
        bonus_token:['vorname','nachname','adresse','wohnort'],
        bonus_cost: 40,
        bonus_risk: 3
      },
      {
        bought:false,
        locked:true,
        id:"p7",
        title:"Community Mods",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:false,
        locked:false,
        id:"p8",
        title:"Privacy Policy",
        logo:"img/upgrades/privacy_s1.png",
        logo_big:"img/upgrades/privacy-big_s1.png",
        description:"The longer, more complicated and more trustworthy your Privacy Policy sounds, the faster and more willingly people will open their hearts to you. Who cares whether your \"statement of privacy\" actually states there is none? Who even reads these things?",
        action_cost: 2800,
        bonus_profiles: 17000,
        bonus_risk:-1
      }
     ],
     // partnerboerse werbung
     actions: [
       {
        bought:false,
        locked:false,
        id:"a1",
        title:"TV Ad",
        logo:"img/actions/tv-spot_s1.png",
        logo_big:"img/actions/tv-spot-big_s1.png",
        description:"TV Ads aren’t cheap, but boy, are they worth it. Just make sure it’s got a stupid punchline and you’re on.",
        bonus_profiles:17000,
        action_cost: 1900,
        bonus_cost: 70,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:false,
        id:"a3",
        title:"Spring Break Trip",
        logo:"img/actions/maturareise_s1.png",
        logo_big:"img/actions/maturareise-big_s1.png",
        description:"Spring break in Cancun is no day on the beach for your team, but it does provide the perfect environment for scoring thousands of judgement-impaired profiles.",
        bonus_profiles:5000,
        action_cost: 400,
        bonus_cost: 20,
        bonus_risk: -1
       },
       {
        bought:false,
        locked:false,
        id:"a4",
        title:"Singles Parties",
        logo:"img/actions/singleparty_s1.png",
        logo_big:"img/actions/singleparty-big_s1.png",
        description:"Regular singles parties provide some social warmth for your users and are a must-have for every dating agency.",
        bonus_profiles:8000,
        action_cost: 700,
        bonus_cost: 30,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:true,
        id:"a2",
        title:"Rock Festival",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 1900
      },
       {
        bought:false,
        locked:false,
        id:"a5",
        title:"Real estate mogul",
        logo:"img/actions/baumeister_s1.png",
        logo_big:"img/actions/baumeister-big_s1.png",
            description:"Buy yourself a celeb to promote your business! Real estate moguls are a local specialty. Careful though: Not suitable for every occasion!",
        bonus_profiles:3000,
        action_cost: 500,
        bonus_cost: 40,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:true,
        id:"a6",
        title:"TV-Presenter",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 500
      },
       {
        bought:false,
        locked:false,
        id:"a7",
        title:"Paid Postings",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Get yourself some net slaves who anonymously hail your product. Just have them add a little criticism now and then and nobody will ever guess...",
        bonus_profiles:25000,
        action_cost: 1400,
        bonus_cost: 120,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:false,
        id:"a8",
        title:"Comparative Test",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Put a seemingly independent product test online. Of course your product comes in first, even if only by a small margin.",
        bonus_profiles:13000,
        action_cost: 1700,
        bonus_cost: 10,
        bonus_risk: -1
      }
    ],
    team: [
      {
        bought:false,
        locked:false,
        id:"t1",
        title:team.manager.title,
        logo:team.manager.logo,
        logo_big:team.manager.logo_big,
        description:team.manager.description,
        action_cost: 600,
        bonus_profiles: 7000,
        bonus_cost: 40
      },
      {
        bought:false,
        locked:false,
        id:"t2",
        title:team.managerin.title,
        logo:team.managerin.logo,
        logo_big:team.managerin.logo_big,
        description:team.managerin.description,
        action_cost: 500,
        bonus_profiles: 8000,
        bonus_cost: 30
      },
      {
        bought:false,
        locked:false,
        id:"t3",
        title:team.grafiker.title,
        logo:team.grafiker.logo,
        logo_big:team.grafiker.logo_big,
        description:team.grafiker.description,
        action_cost: 700,
        bonus_profiles: 10000,
        bonus_cost: 60
      },
      {
        bought:false,
        locked:false,
        id:"t6",
        title:team.grafikerin.title,
        logo:team.grafikerin.logo,
        logo_big:team.grafikerin.logo_big,
        description:team.grafikerin.description,
        action_cost: 600,
        bonus_profiles: 11000,
        bonus_cost: 60
      },

      {
        bought:false,
        locked:false,
        id:"t5",
        title:team.programmierer2.title,
        logo:team.programmierer2.logo,
        logo_big:team.programmierer2.logo_big,
        description:team.programmierer2.description,
        action_cost: 500,
        bonus_profiles: 8000,
        bonus_cost: 50
      },
      {
        bought:false,
        locked:false,
        id:"t4",
        title:team.programmierer.title,
        logo:team.programmierer.logo,
        logo_big:team.programmierer.logo_big,
        description:team.programmierer.description,
        action_cost: 800,
        bonus_profiles: 12000,
        bonus_cost: 70
      },
      {
        bought:false,
        locked:false,
        id:"t7",
        title:team.psychologin.title,
        logo:team.psychologin.logo,
        logo_big:team.psychologin.logo_big,
        description:team.psychologin.description,
        action_cost: 1200,
        bonus_profiles: 18000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t8",
        title:team.anwalt.title,
        logo:team.anwalt.logo,
        logo_big:team.anwalt.logo_big,
        description:team.anwalt.description,
        action_cost: 800,
        bonus_profiles: 11000,
        bonus_cost: 60,
        bonus_risk: -1
      }
    ]
},
{
    x: 1175,
    y: 599,
    font_attr: LABEL_FONT,
    label: 'Personality Tests',
    title: 'Personality Tests',
    data_id:'psychotest',
    description:"Everyone loves online personality tests! And with their help, you can create detailed character profiles. Of course, to see the premium analysis of their laboriously filled out tests, participants just need to enter a few personal details...",
    sprite_w: 144,
    sprite_h: 144,
    sprite_img: 'img/project-psychotest_s1.png',
    sprite_img_down: 'img/project-psychotest-down_s1.png',
    sprite_img_hover: 'img/project-psychotest-hover_s1.png',
    sprite_img_drag: 'img/project-psychotest-drag_s1.png',
    logo:"img/project-psychotest-logo.png",
    ready: true,
    action_cost: 130,
    action_time: 30000,
    base_amount: 2000,
    base_risk: 1,
    tokens:[
            'ipadresse',
            'geburtsdatum',
            'geschlecht'
            ],
    upgrades: [{
        bought:false,
        locked:false,
        id:"p1",
        title:"Logo & Design",
        logo:"img/upgrades/design_s1.png",
        logo_big:"img/upgrades/design-big_s1.png",
        description:"Make it shine! Pimping your venture is the way to go. A slick company design will make it even easier to get customers to part with their data.",
        action_cost: 900,
        bonus_profiles:8000,
        bonus_cost: 20
      },{
        bought:true,
        locked:false,
        id:"p2",
        title:'"Test your IQ!"',
        logo:"img/upgrades/test1_s1.png",
        logo_big:"img/upgrades/test1-big_s1.png",
        description:"With a nice little test to determine their so-called IQ, you’ll score big time with the Internet crowd – they all love to hear how smart they are!",
        action_cost: 800,
        bonus_cost: 10,
        bonus_token:['iq'],
        bonus_risk: 1
      },
      {
        bought:false,
        locked:false,
        id:"p3",
        title:'"How faithful are you?"',
        logo:"img/upgrades/test2_s1.png",
        logo_big:"img/upgrades/test2-big_s1.png",
        description:"Use this test to determine the confidentiality, reliability, and loyalty of your users. Of course those results only apply in romantic situations...",
        action_cost: 1300,
        bonus_cost: 10,
        bonus_token:['vertrauenswuerdigoderunzuverlaessig'],
        bonus_risk: 1
      },
      {
        bought:false,
        locked:false,
        id:"p4",
        title:'"Are you depressed?"',
        logo:"img/upgrades/test3_s1.png",
        logo_big:"img/upgrades/test3-big_s1.png",
        description:"Happy and content or frustrated and depressed? Genuine depression is no joke, but you’ll definitely find some takers for your test results.",
        bonus_token:['zufriedenoderfrustriert'],
        action_cost: 1300,
        bonus_cost: 10,
        bonus_risk: 1
      },
      {
        bought:false,
        locked:true,
        id:"p5",
        title:'Banner Ad',
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0
      },
      {
        bought:true,
        locked:false,
        id:"p6",
        title:"Results via email",
        logo:"img/upgrades/ergebnisperemail_s1.png",
        logo_big:"img/upgrades/ergebnisperemail-big_s1.png",
        description:"Of course your tests are completely anonymous! However, the extensive, reputable premium analysis is available only via email. Just ask them for their email addresses.",
        action_cost: 1500,
        bonus_cost: 30,
        bonus_token:['email'],
        bonus_risk: 2
      },
      {
        bought:false,
        locked:false,
        id:"p7",
        title:"Results via mail",
        logo:"img/upgrades/ergebnisperpost_s1.png",
        logo_big:"img/upgrades/ergebnisperpost-big_s1.png",
        description:"Of course your tests are completely anonymous! However, the extensive, reputable premium analysis is only available via postal mail. Just ask them for their real name and street address.",
        bonus_cost: 40,
        action_cost: 2400,
        bonus_token:['vorname','nachname','adresse','wohnort'],
        bonus_risk: 2
      },
      {
        bought:false,
        locked:false,
        id:"p8",
        title:"Privacy Policy",
        logo:"img/upgrades/privacy_s1.png",
        logo_big:"img/upgrades/privacy-big_s1.png",
        description:"The longer, more complicated and more trustworthy your Privacy Policy sounds, the faster and more willingly people will open their hearts to you. Who cares whether your \"statement of privacy\" actually states there is none? Who even reads these things?",
        action_cost: 2800,
        bonus_profiles:17000,
        bonus_risk:-1
      }
     ],
    // psychotest werbung
    actions: [
      {
        bought:false,
        locked:false,
        id:"a1",
        title:"TV Ad",
        logo:"img/actions/tv-spot_s1.png",
        logo_big:"img/actions/tv-spot-big_s1.png",
        description:"TV Ads aren’t cheap, but boy, are they worth it. Just make sure it’s got a stupid punchline and you’re on.",
        action_cost: 1900,
        bonus_profiles: 17000,
        bonus_cost: 70,
        bonus_risk: -1
      },
     {
        bought:false,
        locked:true,
        id:"a2",
        title:"Radio-Spot",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 1900,
        bonus_profiles: 17000
      },
      {
        bought:false,
        locked:true,
        id:"a3",
        title:"Newspaper Ad",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:5
      },
      {
        bought:false,
        locked:false,
        id:"a5",
        title:"Ex-Athlete",
        logo:"img/actions/sportler_s1.png",
        logo_big:"img/actions/sportler-big_s1.png",
        description:"Buy yourself a celeb to promote your business. Ex-athletes are a much better choice than ex-politicians – their status as darlings of the nation means they’re especially well-suited for your purposes.",
        action_cost: 2200,
        bonus_profiles: 21000,
        bonus_cost: 90,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:true,
        id:"a5",
        title:"Banner Ad",
        logo:"img/upgrades/locked_s1.png",
        action_cost: 0,
        bonus_profiles:5
      },
      {
        bought:false,
        locked:false,
        id:"a6",
        title:"Paid Postings",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Get yourself some net slaves who anonymously hail your product. Just have them add a little criticism now and then and nobody will ever guess...",
        action_cost: 1400,
        bonus_profiles: 25000,
        bonus_cost: 120,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"a7",
        title:"Amateur Website",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Create an amateurish-looking website which deals with your range of products. These things are easily found by search engines and come across as quite trustworthy.",
        action_cost: 900,
        bonus_profiles: 17000,
        bonus_cost: 50,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"a8",
        title:"Viral video",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Much cheaper than a TV spot: Create a crappy video on your mobile phone filming some stupid stunt with your product. Stuff like that goes viral pretty quickly and people will hardly care if later you’re outed at the sponsor.",
        action_cost: 2600,
        bonus_profiles: 33000,
        bonus_cost: 20,
        bonus_risk: -1
      }
    ],
    team: [
      {
        bought:false,
        locked:false,
        id:"t1",
        title:team.manager.title,
        logo:team.manager.logo,
        logo_big:team.manager.logo_big,
        description:team.manager.description,
        action_cost: 600,
        bonus_profiles: 6000,
        bonus_cost: 40
      },
      {
        bought:false,
        locked:false,
        id:"t2",
        title:team.managerin.title,
        logo:team.managerin.logo,
        logo_big:team.managerin.logo_big,
        description:team.managerin.description,
        action_cost: 500,
        bonus_profiles: 7000,
        bonus_cost: 30
      },
      {
        bought:false,
        locked:false,
        id:"t5",
        title:team.programmierer2.title,
        logo:team.programmierer2.logo,
        logo_big:team.programmierer2.logo_big,
        description:team.programmierer2.description,
        action_cost: 500,
        bonus_profiles: 8000,
        bonus_cost: 50
      },
      {
        bought:false,
        locked:false,
        id:"t4",
        title:team.programmierer.title,
        logo:team.programmierer.logo,
        logo_big:team.programmierer.logo_big,
        description:team.programmierer.description,
        action_cost: 800,
        bonus_profiles: 12000,
        bonus_cost: 70
      },
      {
        bought:false,
        locked:false,
        id:"t3",
        title:team.werbefuzzi.title,
        logo:team.werbefuzzi.logo,
        logo_big:team.werbefuzzi.logo_big,
        description:team.werbefuzzi.description,
        action_cost: 600,
        bonus_profiles: 14000,
        bonus_cost: 70,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"t6",
        title:team.forscherin.title,
        logo:team.forscherin.logo,
        logo_big:team.forscherin.logo_big,
        description:team.forscherin.description,
        action_cost: 1000,
        bonus_profiles: 15000,
        bonus_cost: 70
      },
      {
        bought:false,
        locked:false,
        id:"t7",
        title:team.psychologe.title,
        logo:team.psychologe.logo,
        logo_big:team.psychologe.logo_big,
        description:team.psychologe.description,
        action_cost: 1200,
        bonus_profiles: 18000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t8",
        title:team.anwalt.title,
        logo:team.anwalt.logo,
        logo_big:team.anwalt.logo_big,
        description:team.anwalt.description,
        action_cost: 850,
        bonus_profiles:11000,
        bonus_risk:-1,
        bonus_cost:60
      }
    ]
},
{
    x: 1317,
    y: 441,
    font_attr: LABEL_FONT,
    label: 'Loyalty Cards',
    title: 'Loyalty Cards',
    data_id:'vorteilsclub',
    description:"Tell me what you buy, and I’ll tell you who you are! Operate your loyalty card scheme for supermarkets, gas stations, furniture stores or fitness studios. Special offers for club members draw shoppers like moths, and you learn everything about their purchases.",
    sprite_w: 144,
    sprite_h: 144,
    sprite_img: 'img/project-vorteilsclub_s1.png',
    sprite_img_down: 'img/project-vorteilsclub-down_s1.png',
    sprite_img_hover: 'img/project-vorteilsclub-hover_s1.png',
    sprite_img_drag: 'img/project-vorteilsclub-drag_s1.png',
    logo:"img/project-vorteilsclub-logo.png",
    ready: true,
    action_cost: 120,
    action_time: 60000,
    base_amount: 0,
    base_risk: 1,
    tokens:[
            'vorname',
            'nachname',
            'adresse',
            'wohnort',
            'geburtsdatum',
            'geschlecht',
            'telefonnummer',
            'email',
            'konsumgewohnheiten'
            //'ernaehrungsweise'
            ],
    upgrades:[
      {
        bought:false,
        locked:false,
        id:"p1",
        title:"Logo & Design",
        logo:"img/upgrades/design_s1.png",
        logo_big:"img/upgrades/design-big_s1.png",
        description:"Make it shine! Pimping your venture is the way to go. A slick company design will make it even easier to get customers to part with their data.",
        action_cost: 900,
        bonus_profiles: 800,
        bonus_cost: 20
      },
      {
        bought:true,
        locked:false,
        id:"p2",
        logo:"img/upgrades/design_s1.png",
        logo_big:"img/upgrades/design-big_s1.png",
        title:"Partnership with supermarket chain",
        logo:"img/upgrades/supermarkt_s1.png",
        logo_big:"img/upgrades/supermarkt-big_s1.png",
        description:"Your cooperation with a well-known supermarket chain is only the first step. You can still push your loyalty card system at gas stations, furniture stores, book stores or fitness studios later on.",
        action_cost: 1000,
        bonus_token:['ernaehrungsweise'],
        bonus_profiles: 1200,
        bonus_cost: 60,
        bonus_risk: 3
      },
      {
        bought:false,
        locked:false,
        id:"p3",
        title:"Partnership with furniture chain",
        logo:"img/upgrades/moebel_s1.png",
        logo_big:"img/upgrades/moebel-big_s1.png",
        description:"Increase your reach by cooperating with a chain of furniture stores. The fancy family club cards will be used for every shopping trip, and by analyzing buying patterns over a longer period of time you can make some pretty good assumptions about household income.",
        action_cost: 1400,
        bonus_token:['einkommen'],
        bonus_profiles: 8000,
        bonus_cost: 40,
        bonus_risk: 3
      },
      {
        bought:false,
        locked:false,
        id:"p4",
        title:"Partnership with bookstore chain",
        logo:"img/upgrades/buch_s1.png",
        logo_big:"img/upgrades/buch-big_s1.png",
        description:"Increase your reach by cooperating with a chain of bookstores. If you analyze buying patterns over a longer period of time, you’ll be able to infer political attitudes and more.",
        action_cost: 1200,
        bonus_token:['politischeeinstellung'],
        bonus_profiles: 6000,
        bonus_cost: 30,
        bonus_risk: 3
      },
      {
        bought:false,
        locked:true,
        id:"p5",
        title:"Partnership with fitness  chain",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:600
      },
      {
        bought:false,
        locked:true,
        id:"p6",
        title:"Partnership with fashion  chain",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 2500,
        bonus_profiles:600
      },
      {
        bought:false,
        locked:false,
        id:"p7",
        title:"Bonus Program",
        logo:"img/upgrades/bonus_s1.png",
        logo_big:"img/upgrades/bonus-big_s1.png",
        description:"Your customers will receive yummy bonus offers for filling out just one little questionnaire. Naturally the answers will only be used to improve quality of service!",
        action_cost: 600,
        bonus_profiles: 4000,
        bonus_cost: 10
      },
      {
        bought:false,
        locked:false,
        id:"p8",
        title:"Privacy Policy",
        logo:"img/upgrades/privacy_s1.png",
        logo_big:"img/upgrades/privacy-big_s1.png",
        description:"The longer, more complicated and more trustworthy your Privacy Policy sounds, the faster and more willingly people will open their hearts to you. Who cares whether your “statement of privacy” actually states there is none? Who even reads these things?",
        action_cost: 2800,
        bonus_profiles: 17000,
        bonus_risk: -1
      }
    ],
    // vorteilsclub werbung
     actions: [
       {
        bought:false,
        locked:false,
        id:"a1",
        title:"TV Ad",
        logo:"img/actions/tv-spot_s1.png",
        logo_big:"img/actions/tv-spot-big_s1.png",
        description:"TV Ads aren’t cheap, but boy, are they worth it. Just make sure it’s got a stupid punchline and you’re on.",
        bonus_profiles:17000,
        action_cost: 1900,
        bonus_cost: 70,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:false,
        id:"a4",
        title:"Poster Ads",
        logo:"img/actions/plakat_s1.png",
        logo_big:"img/actions/plakat-big_s1.png",
        description:"Have someone design a convincing poster and plaster the streets with it. Make it provocative so the message really sticks.",
        bonus_profiles: 8000,
        action_cost: 700,
        bonus_cost: 30,
        bonus_risk: -1
      },

      {
        bought:false,
        locked:false,
        id:"a2",
        title:"Ski Jumping",
        logo:"img/actions/skijump_s1.png",
        logo_big:"img/actions/skijump-big_s1.png",
        description:"Become the main sponsor of ski jumping! You’ll soon rise to fame, and the hearts and profiles of every extreme armchair athlete will be yours.",
        bonus_profiles: 10000,
        action_cost: 1200,
        bonus_cost: 30,
        bonus_risk: -1
      },
      { 
        bought:false,
        locked:false,
        id:"a3",
        title:"Spring Break Trip",
        logo:"img/actions/maturareise_s1.png",
        logo_big:"img/actions/maturareise-big_s1.png",
        description:"Spring break in Cancun is no day on the beach for your team, but it does provide the perfect environment for scoring thousands of judgement-impaired profiles.",
        bonus_profiles: 5000,
        action_cost: 400,
        bonus_cost: 20,
        bonus_risk: -1
       },
       {
        bought:false,
        locked:false,
        id:"a5",
        title:"Ex-Athlete",
        logo:"img/actions/sportler_s1.png",
        logo_big:"img/actions/sportler-big_s1.png",
        description:"Buy yourself a celeb to promote your business. Ex-athletes are a much better choice than ex-politicians – their status as darlings of the nation means they’re especially well-suited for your purposes.",
        bonus_profiles: 28000,
        action_cost: 2800,
        bonus_cost: 120,
        bonus_risk: -1
      },
       {
        bought:false,
        locked:false,
        id:"a6",
        title:"Real estate mogul",
        logo:"img/actions/baumeister_s1.png",
        logo_big:"img/actions/baumeister-big_s1.png",
        description:"Buy yourself a celeb to promote your business! Real estate moguls are a local specialty. Careful though: not suitable for every occasion!",
        bonus_profiles: 16000,
        action_cost: 900,
        bonus_cost: 100,
        bonus_risk: -1
      },

       {
        bought:false,
        locked:true,
        id:"a7",
        title:"TV-Presenter",
        logo:"img/upgrades/locked_s1.png",
        description:"",
        action_cost: 500
      },
       {
        bought:false,
        locked:false,
        id:"a8",
        title:"Paid Postings",
        logo:"img/actions/online_s1.png",
        logo_big:"img/actions/online-big_s1.png",
        description:"Get yourself some net slaves who anonymously hail your product. Just have them add a little criticism now and then and nobody will ever guess...",
        bonus_profiles:25000,
        action_cost: 1400,
        bonus_cost: 120,
        bonus_risk: -1
      }
    ],
    // vorteilsclub team
    team: [
      {
        bought:false,
        locked:false,
        id:"t1",
        title:team.manager.title,
        logo:team.manager.logo,
        logo_big:team.manager.logo_big,
        description:team.manager.description,
        action_cost: 600,
        bonus_profiles:5000,
        bonus_cost: 30
      },
      {
        bought:false,
        locked:false,
        id:"t2",
        title:team.managerin.title,
        logo:team.managerin.logo,
        logo_big:team.managerin.logo_big,
        description:team.managerin.description,
        action_cost: 500,
        bonus_profiles:6000,
        bonus_cost: 20
      },
      {
        bought:true,
        locked:false,
        id:"t4",
        title:team.grafikerin.title,
        logo:team.grafikerin.logo,
        logo_big:team.grafikerin.logo_big,
        description:team.grafikerin.description,
        action_cost: 600,
        bonus_profiles: 14000,
        bonus_cost: 70,
        bonus_risk: -1
      },
      {
        bought:false,
        locked:false,
        id:"t5",
        title:team.werbefuzzi.title,
        logo:team.werbefuzzi.logo,
        logo_big:team.werbefuzzi.logo_big,
        description:team.werbefuzzi.description,
        action_cost: 800,
        bonus_profiles: 8000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t3",
        title:team.praktikant.title,
        logo:team.praktikant.logo,
        logo_big:team.praktikant.logo_big,
        description:team.praktikant.description,
        action_cost: 20,
        bonus_profiles:2000,
        bonus_cost: 6
      },
      {
        bought:false,
        locked:false,
        id:"t6",
        title:team.praktikantin.title,
        logo:team.praktikantin.logo,
        logo_big:team.praktikantin.logo_big,
        description:team.praktikantin.description,
        action_cost: 10,
        bonus_profiles:3000,
        bonus_cost: 4
      },
      {
        bought:false,
        locked:false,
        id:"t7",
        title:team.psychologe.title,
        logo:team.psychologe.logo,
        logo_big:team.psychologe.logo_big,
        description:team.psychologe.description,
        action_cost: 1200,
        bonus_profiles:18000,
        bonus_cost: 80
      },
      {
        bought:false,
        locked:false,
        id:"t8",
        title:team.anwalt.title,
        logo:team.anwalt.logo,
        logo_big:team.anwalt.logo_big,
        description:team.anwalt.description,
        action_cost: 800,
        bonus_profiles:11000,
        bonus_cost: 60,
        bonus_risk: -1
      }
    ]
}

]

var database_data = {
    x: 828,
    y: 433,
    font_attr: LABEL_FONT,
    label: 'Database',
    sprite_w: 192,
    sprite_h: 240, 
    sprite_img: 'img/datenbank_s1.png',
    sprite_img_hover: 'img/datenbank-hover_s1.png',
    sprite_img_drag: 'img/datenbank-drag_s1.png',
    sprite_img_down: 'img/datenbank-down_s1.png',
}

var default_ready_decorator = {
    offset_x: 25,
    offset_y: -55,
    sprite_img: 'img/action-profileabholen_s1.png',
    sprite_img_hover: 'img/action-profileabholen-hover_s1.png',
    sprite_w: 80,
    sprite_h: 80
}
var default_working_decorator = {
    offset_x: 115,
    offset_y: -5,
    sprite_img: 'img/icon-timer_s1.png',
    sprite_img_hover: 'img/icon-timer_s1.png',
    sprite_w: 30,
    sprite_h: 30
}
var customer_ready_decorator = {
    offset_x: 25,
    offset_y: -52,
    sprite_img: 'img/action-cashabholen_s1.png',
    sprite_img_hover: 'img/action-cashabholen-hover_s1.png',
    sprite_w: 90,
    sprite_h: 76
}
var db_decorator = {
    offset_x: 6,
    offset_y: 16,
    sprite_img: 'img/icon-profile_s1.png',
    sprite_img_hover: 'img/icon-profile_s1.png',
    sprite_w: 16,
    sprite_h: 16
}

var bar_decorator = {
    offset_x: 15,
    offset_y: 96,
    sprite_img: 'img/token_bar.png',
    sprite_img_hover: 'img/token_bar.png',
    sprite_w: 95,
    sprite_h: 23,
    bar_height: 8,
    bar_offset_left: 4,
    bar_offset_right: 11,
    bar_offset_top: 4,
    bar_radius: 3
}



var STATUS_BARS = { 
        profile_bar:{ 
                        id: 'profile_bar',
                        font_attr: STATUS_BAR_FONT,
                        text_offset_x: 10,
                        bar_image: 'img/statusbar-background.png',
                        deco_image: 'img/statusbar-profile.png',
                        bar_dim: {x: 15, y: 10, w: 160, h:36},
                        deco_dim: {x: 5, y:0, w: 51, h: 57},
                        prog_attr: {'fill': '#009fd9','stroke':'#e48931','stroke-width':0},
                        prog_attr_active: {'fill': '#BFE7F5'},
                        init_val: 1132893,
                        max_val: 8430558
                    },
        money_bar:  { 
                        id: 'money_bar',
                        font_attr: STATUS_BAR_FONT,
                        text_offset_x: 0,
                        bar_image: 'img/statusbar-background.png',
                        deco_image: 'img/statusbar-kohle.png',
                        bar_dim: {x: 217, y: 10, w: 160, h:36},
                        deco_dim: {x: 180, y:0, w: 64, h: 57},
                        prog_attr: {'fill': '#5da445','stroke':'#B6D7A8','stroke-width':0},
                        prog_attr_active: {'fill': '#B6D7A8'},
                        init_val: 5000,
                        max_val: 1
                    },
        ap_bar:     { 
                        id: 'ap_bar',
                        font_attr: STATUS_BAR_FONT,
                        text_offset_x: 0,
                        bar_image: 'img/statusbar-background.png',
                        deco_image: 'img/statusbar-ap.png',
                        bar_dim: {x: 395, y: 10, w: 160, h:36},
                        deco_dim: {x: 380, y:0, w: 45, h: 57},
                        prog_attr: {'fill': '#e48931','stroke':'none','stroke-width':0},
                        prog_attr_active: {'fill': '#FFD800'},
                        init_val: 15,
                        max_val: 15
                    },
        image_bar:  { 
                        id: 'image_bar',
                        font_attr: STATUS_BAR_FONT,
                        text_offset_x: 0,
                        bar_image: 'img/statusbar-background.png',
                        deco_image: 'img/statusbar-image.png',
                        bar_dim: {x: 585, y: 10, w: 160, h:36},
                        deco_dim: {x: 560, y:0, w: 49, h: 57},
                        prog_attr: {'fill': '#cd495d','stroke':'none','stroke-width':0},
                        prog_attr_active: {'fill': '#EA9999'},
                        init_val: 5,
                        max_val: 100
                    },
        xp_bar:     { 
                        id: 'xp_bar',
                        font_attr: STATUS_BAR_FONT,
                        text_offset_x: 0,
                        bar_image: 'img/statusbar-background.png',
                        deco_image: 'img/statusbar-xp.png',
                        bar_dim: {x: 750, y: 10, w: 160, h:36},
                        deco_dim: {x: 890, y:0, w: 64, h: 57},
                        prog_attr: {'fill': '#ffff00','stroke':'none','stroke-width':0},
                        prog_attr_active: {'fill': '#FFE'},
                        init_val: 16,
                        levels: [
                            [0, 0],
                            [1, 5],
                            [6, 20],
                            [21, 30],
                            [31, 50],
                            [51, 80],
                            [81, 120],
                            [121, 180],
                            [181, 260],
                            [261, 360],
                            [360, 500],
                            [501, 1000],
                            [1001, 5000],
                            [1001, 5000],
                            [5001, 10000],
                            [10001, 20000],
                            [20001, 50000],
                            [50001, 100000],
                            [100001, 999999999999]
                        ]
                    }
};

function extend(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.prototype.constructor = C;
    C.P = P.prototype;
}


