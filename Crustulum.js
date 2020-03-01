if (typeof Crustulum !== 'undefined') {
    if (Crustulum === null) {
        delete Crustulum;
    } else throw new Error('Crustulum already loaded.');
}
var Crustulum = {
    OG: {}, // Original Game Data
    Game: { // Our overrides
        UpdateMenu: () => {
            Crustulum.OG.UpdateMenu();
            if (Game.onMenu == 'prefs') {
                let fragment = document.createDocumentFragment();
                fragment.appendChild(Crustulum.Menu.heading('Crustulum Toggleables'));
                fragment.appendChild(Crustulum.Menu.subheading('Auto Clickers'));
                fragment.appendChild(Crustulum.Menu.toggleButton('autoClicker','Auto Click Big Cookie','Clicks the big cookie for you.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('autoGolden','Auto Click Golden Cookies','Clicks any golden cookies for you.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('autoReindeer','Auto Click Reindeer','Clicks on reindeer for you'));
                fragment.appendChild(Crustulum.Menu.toggleButton('autoNews','Auto Click News','Clicks on the news ticker for you.'));
                fragment.appendChild(Crustulum.Menu.subheading('Golden Cookies'));
                fragment.appendChild(Crustulum.Menu.toggleButton('blockWrath','Block Wrath Cookies','Prevents wrath cookies from spawning.'));
                fragment.appendChild(Crustulum.Menu.subheading('Infinite Stuff'));
                fragment.appendChild(Crustulum.Menu.toggleButton('infiniteCookies','Infinite Cookies','Causes your cookies to constantly regenerate.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('infiniteMagic','Infinite Magic','Causes your Grimoire magic to recharge almost instantly'));
                fragment.appendChild(Crustulum.Menu.toggleButton('infiniteSwaps','Infinite Swaps','Causes your Pantheon swaps to regenerate almost instantly.'));
                fragment.appendChild(Crustulum.Menu.subheading('Mini-game Enhancers'));
                fragment.appendChild(Crustulum.Menu.toggleButton('miracleSpells','Miracle Spell™','Grimoire spells will never fail.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('immortalPlants','Make Plants Immortal','Makes it so plants never wither. Does not affect weeds or fungi.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('neverWeeds','Never Weed™','Makes it so weeds never spawn on their own. You can still plant them and they still may spread.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('allGodsActive','Pantheon \'R Us','All Pantheon gods except for Cyclius will be active in slot one.'));
                fragment.appendChild(Crustulum.Menu.toggleButton('allGodsSlotOne','Power Of The Gods','All Pantheon gods will behave as if they are in slot 1 regardless of which slot they are in.'));
                fragment.appendChild(Crustulum.Menu.heading('Crustulum Actions'));
                fragment.appendChild(Crustulum.Menu.subheading('Spawning'));
                fragment.appendChild(Crustulum.Menu.actionButton('spawnGolden','Spawn a Golden Cookie','Spawns a golden cookie.', Crustulum.Actions.spawnGolden));
                fragment.appendChild(Crustulum.Menu.actionButton('spawnGoldenFrenzy','Spawn a Frenzy Cookie','Spawns a golden cookie that will cause a frenzy.', Crustulum.Actions.spawnGolden));
                fragment.appendChild(Crustulum.Menu.actionButton('spawnGoldenDragonflight','Spawn a Dragonflight Cookie','Spawns a golden cookie that will cause a dragonflight.', Crustulum.Actions.spawnGoldenDragonflight));
                fragment.appendChild(Crustulum.Menu.actionButton('giveSugarLump','Give Sugar Lump','Gives you a sugar limp.', Crustulum.Actions.giveSugarLump));
                fragment.appendChild(Crustulum.Menu.actionButton('giveCookies','Give Cookies','Gives you the most cookies you can have without getting the cheated cookies achievement.', Crustulum.Actions.giveCookies));
                fragment.appendChild(Crustulum.Menu.subheading('Mini-games'));
                fragment.appendChild(Crustulum.Menu.actionButton('refillMagic','Refill Magic','Refill all of your Grimoire\'s magic.', Crustulum.Actions.refillMagic));
                fragment.appendChild(Crustulum.Menu.actionButton('refillSwaps','Refill Swaps','Refill all of your Pantheon\'s swaps', Crustulum.Actions.refillSwaps));
                fragment.appendChild(Crustulum.Menu.subheading('Unlock Things'));
                fragment.appendChild(Crustulum.Menu.actionButton('unlockAllSeeds','Unlock Plant Seeds','Unlocks all the plant seeds for your Garden. Does not unlock weeds or fungi.', Crustulum.Actions.unlockAllSeeds));
                fragment.appendChild(Crustulum.Menu.actionButton('unlockAllWeedFungusSeeds','Unlock Weed and Fungi Seeds','Unlocks all the weed and fungus seeds for the Garden.', Crustulum.Actions.unlockAllWeedFungusSeeds));
                fragment.appendChild(Crustulum.Menu.actionButton('lockAllSeeds','Lock All Seeds','Locks all the seeds for the Garden except for the starting seed.', Crustulum.Actions.lockAllSeeds));
                fragment.appendChild(Crustulum.Menu.subheading('Misc'));
                fragment.appendChild(Crustulum.Menu.actionButton('removeCheatedCookies','Remove Cheat Achievement','Remove \'Cheated cookies taste awful\' achievement', Crustulum.Actions.removeCheatedCookies));

                // Unload Crustulum button. Doesn't work if you loaded other add-ons first. We check only for Cookie Monster.
                if (typeof CM === 'undefined' || Crustulum.cookieMonsterLoaded) fragment.appendChild(Crustulum.Menu.actionButton('unloadCrustulum','Unload Crustulum','Unloads Crustulum and disabled all of it\'s features.', Crustulum.Actions.unloadCrustulum));

                Crustulum.PluginHooks.UpdateMenu(fragment);
        
                l('menu').childNodes[2].insertBefore(fragment, l('menu').childNodes[2].childNodes[l('menu').childNodes[2].childNodes.length - 1]);
            }
        },
    },
    Actions: { // Our action library
        spawnGolden: () => {
            Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
        },
        spawnGoldenFrenzy: ()=>Crustulum.Actions.spawnGoldenFixed('frenzy'),
        spawnGoldenDragonflight: ()=>Crustulum.Actions.spawnGoldenFixed('dragonflight'),
        spawnGoldenFixed: (type) => {
            let newShimmer = new Game.shimmer('golden',{noWrath:true});
            newShimmer.dur = 10000;
            newShimmer.life = Math.ceil(Game.fps*newShimmer.dur);
            newShimmer.force = type;
            newShimmer.sizeMult = 2;
            return newShimmer;
        },
        removeCheatedCookies: ()=>Game.RemoveAchiev('Cheated cookies taste awful'),
        refillMagic: ()=>{
            if (Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.magicM)
                Game.Objects['Wizard tower'].minigame.magic = Game.Objects['Wizard tower'].minigame.magicM;
        },
        refillSwaps: ()=>{
            if (Game.Objects['Temple'].minigameLoaded && Game.Objects['Temple'].minigame.gods) {
                Game.Objects['Temple'].minigame.swaps=3;
                Game.Objects['Temple'].minigame.swapT=Date.now();
                Game.Objects['Temple'].minigame.lastSwapT=0;
            }
        },
        giveSugarLump: ()=>{
            Game.gainLumps(1);
        },
        giveCookies: ()=>{
            Game.cookies = Game.cookiesEarned;
        },
        unlockAllSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) return;
                    if (plant.weed || plant.fungus) return;
                    Game.Objects['Farm'].minigame.unlockSeed(plant);
                });
            }
        },
        unlockAllWeedFungusSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) return;
                    if (!plant.weed && !plant.fungus) return;
                    Game.Objects['Farm'].minigame.unlockSeed(plant);
                });
            }
        },
        lockAllSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) Game.Objects['Farm'].minigame.lockSeed(plant);
                });
                Game.Objects['Farm'].minigame.unlockSeed(Game.Objects['Farm'].minigame.plants['bakerWheat']);
            }
        },
        unloadCrustulum: ()=>{
            Object.keys(Crustulum.ticks).forEach((tickThis) => {
                let tick = Crustulum.ticks[tickThis];
                if (tick.intervalId) {
                    clearInterval(tick.intervalId);
                    tick.intervalId = 0;
                }
            });
            Crustulum.Liberate.Game();
            Crustulum.PluginHooks.UnloadPlugins();
            Game.UpdateMenu();
            setTimeout(() => Crustulum = null, 100);
        },
    },
    ConfigDefaults: { // The default value for the configs
        'autoClicker': false,
        'autoGolden': false,
        'autoReindeer': false,
        'autoNews': false,
        'infiniteCookies': false,
        'infiniteMagic': false,
        'infiniteSwaps': false,
        'blockWrath': false,
        'immortalPlants': false,
        'neverWeeds': false,
        'miracleSpells': false,
        'allGodsActive': false,
        'allGodsSlotOne': false,
    },
    Config: {}, // User settings
    Init: () => { // Initialize the add-on.
        if (!Game || !Game.version || !Game.updateLog) {
            alert('The game isn\'t loaded yet or this isn\'t the game.');
            return;
        }
        Crustulum.Hijack.Game();
        Crustulum.loadConfig();
        Crustulum.initTicks();
        Game.Win('Third-party');
        if (typeof CM === 'object' && typeof Queue !== 'undefined' && typeof jscolor !== 'undefined') Crustulum.cookieMonsterLoaded = true;
        Crustulum.PluginHooks.Init();
    },
    cookieMonsterLoaded: false,
    Menu: {
        toggleButton: (configParam, text, description) => {
            let div = document.createElement('div'), a = document.createElement('a'), label = document.createElement('label');
            if (!Crustulum.getConfig(configParam)) a.className = 'option off';
            else a.className = 'option';
            a.id = `crustulum-${configParam}`;
            a.onclick = ()=>Crustulum.toggleConfig(configParam);
            a.textContent = text;
            label.textContent = description;
            div.className = 'listing';
            div.appendChild(a);
            div.appendChild(label);
            return div;
        },
        actionButton: (configParam, text, description, action) => {
            let div = document.createElement('div'), a = document.createElement('a'), label = document.createElement('label');
            a.className = 'option';
            a.id = `crustulum-${configParam}`;
            a.onclick = action;
            a.textContent = text;
            label.textContent = description;
            div.className = 'listing';
            div.appendChild(a);
            div.appendChild(label);
            return div;
        },
        heading: (text) => {
            let heading = document.createElement('div');
            heading.className = 'title';
            heading.textContent = text;
            return heading;
        },
        subheading: (text) => {
            let subheading = Crustulum.Menu.heading(text);
            subheading.style.fontSize = '17px';
            return subheading;
        },
    },
    saveConfig: () => {
        localStorage.setItem('Crustulum', JSON.stringify(Crustulum.Config));
    },
    loadConfig: () => {
        let config = localStorage.getItem('Crustulum');
        if (config) {
            config = JSON.parse(config);
            Object.keys(config).forEach((key) => {
                Crustulum.setConfig(key, config[key]);
            });
        }
    },
    getConfig: (configParam) => {
        if (typeof Crustulum.Config[configParam] === 'undefined')
            return Crustulum.ConfigDefaults[configParam];
        else return Crustulum.Config[configParam];
    },
    setConfig: (configParam, configValue) => {
        if (configValue === Crustulum.ConfigDefaults[configParam])
            delete Crustulum.Config[configParam];
        else Crustulum.Config[configParam] = configValue;
        Crustulum.saveConfig();
        return Crustulum.getConfig(configParam);
    },
    toggleConfig: (configParam) => {
        let val = Crustulum.setConfig(configParam, !Crustulum.getConfig(configParam));
        Crustulum.updateMenuView(configParam);
        return val;
    },
    updateMenuView: (configParam) => {
        if (!Crustulum.getConfig(configParam))
            l(`crustulum-${configParam}`).className = 'option off';
        else
            l(`crustulum-${configParam}`).className = 'option';
    },
    Liberate: {
        Game: () => {
            if (Crustulum.OG.UpdateMenu) Game.UpdateMenu = Crustulum.OG.UpdateMenu;
            if (Crustulum.OG.shimmerPrototypeInit) Game.shimmer.prototype.init = function() {
                Game.shimmerTypes[this.type].initFunc(this);
            };
            if (Game.hasGod) Crustulum.Liberate.hasGod();
            Crustulum.Liberate.miniGames();
        },
        miniGames: () => {
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants && Game.Objects['Farm'].minigame.soils) {
                if (Crustulum.OG.gardenPlantsMortality) Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (!plant.weed && !plant.fungus) Object.defineProperty(plant, 'immortal', {value:Crustulum.OG.gardenPlantsMortality[plantName],configurable: true});
                });
        
                if (Crustulum.OG.gardenSoilWeed) Object.keys(Game.Objects['Farm'].minigame.soils).forEach((soilName) => {
                    let soil = Game.Objects['Farm'].minigame.soils[soilName];
                    Object.defineProperty(soil, 'weedMult', {value:Crustulum.OG.gardenSoilWeed[soilName],configurable: true});
                });
            }
            if(Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.getFailChance) {
                if (Crustulum.OG.grimoireFailChance) Game.Objects['Wizard tower'].minigame.getFailChance = Crustulum.OG.grimoireFailChance;
            }
        },
        hasGod: () => {
            if(Game.Objects['Temple'].minigameLoaded && Game.Objects['Temple'].minigame.gods && Crustulum.OG.hasGod && Game.hasGod) Game.hasGod = Crustulum.OG.hasGod;
            else delete Game.hasGod;
        },
    },
    Hijack: {
        Game: () => {
            if (!Crustulum.OG.UpdateMenu) {
                Crustulum.OG.UpdateMenu = Game.UpdateMenu;
                Game.UpdateMenu = Crustulum.Game.UpdateMenu;
            }
            if (!Crustulum.OG.shimmerPrototypeInit) {
                Crustulum.OG.shimmerPrototypeInit = true;
                Game.shimmer.prototype.init = function() {
                    if (Crustulum.getConfig('blockWrath')) {
                        this.forceObj = {'noWrath':true};
                        Game.shimmerTypes[this.type].initFunc(this);
                    } else {
                        Game.shimmerTypes[this.type].initFunc(this);
                    }
                }
            }
            if (!Crustulum.OG.hasGod) Crustulum.Hijack.hasGod();
        
            Crustulum.Hijack.miniGames();
        },
        miniGames: () => {
            if (!Crustulum) return;
            retry = false;
        
            if(!Game.Objects['Farm'].minigameLoaded || !Game.Objects['Farm'].minigame.plants || !Game.Objects['Farm'].minigame.soils) {
                retry = true;
            } else {
                if (!Crustulum.OG.gardenPlantsMortality) {
                    Crustulum.OG.gardenPlantsMortality = {};
                    Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                        let plant = Game.Objects['Farm'].minigame.plants[plantName];
                        if (!plant.weed && !plant.fungus) {
                            Crustulum.OG.gardenPlantsMortality[plantName] = plant.immortal;
                            Object.defineProperty(plant, 'immortal', {get:()=>{return (Crustulum.getConfig('immortalPlants')?true:Crustulum.OG.gardenPlantsMortality[plantName])},configurable: true});
                        }
                    });
                }
        
                if (!Crustulum.OG.gardenSoilWeed) {
                    Crustulum.OG.gardenSoilWeed = {};
                    Object.keys(Game.Objects['Farm'].minigame.soils).forEach((soilName) => {
                        let soil = Game.Objects['Farm'].minigame.soils[soilName];
                        Crustulum.OG.gardenSoilWeed[soilName] = soil.weedMult;
                        Object.defineProperty(soil, 'weedMult',{get:()=>{return (Crustulum.getConfig('neverWeeds')?0:Crustulum.OG.gardenSoilWeed[soilName])},configurable: true});
                    });
                }
            }
        
            if(!Game.Objects['Wizard tower'].minigameLoaded || !Game.Objects['Wizard tower'].minigame.getFailChance) {
                retry = true;
            } else {
                if (!Crustulum.OG.grimoireFailChance) {
                    Crustulum.OG.grimoireFailChance = Game.Objects['Wizard tower'].minigame.getFailChance;
                    Game.Objects['Wizard tower'].minigame.getFailChance = (spell)=>(Crustulum.getConfig('miracleSpells')?0:Crustulum.OG.grimoireFailChance(spell));
                }
            }
        
            if (retry) setTimeout(Crustulum.Hijack.miniGames, 1000);
        },
        hasGod: () => {
            if (!Crustulum) return;
            if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) {
                setTimeout(Crustulum.Hijack.hasGod, 1000); // We keep running this until we get the real Game.hasGod()
            } else if (!Crustulum.OG.hasGod && Game.hasGod) {
                Crustulum.OG.hasGod = Game.hasGod;
            }
            Game.hasGod = function(what) {
                if (Crustulum.getConfig('allGodsActive')) {
                    if (['ages'].includes(what)) return false; // Add gods to this if you want to skip them
                    return 1;
                } else if (Crustulum.getConfig('allGodsSlotOne')) {
                    if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) return false; // Don't run if minigame isn't loaded (errors otherwise)
                    let god = Game.Objects['Temple'].minigame.gods[what];
                    for (let i=0;i<3;i++)
                        if (Game.Objects['Temple'].minigame.slot[i]==god.id) return 1;
                    return false;
                } else {
                    if (Crustulum.OG.hasGod) return Crustulum.OG.hasGod(what);
                    else return false;
                }
            }
        },
    },
    initTicks: () => {
        Object.keys(Crustulum.ticks).forEach((tickThis) => {
            let tick = Crustulum.ticks[tickThis];
            if (!tick.intervalId) tick.intervalId = setInterval(tick.onTick, tick.rate);
        });
    },
    ticks: {
        'autoClicker': {
            'intervalId': null,
            'rate': 50,
            'onTick': ()=>{
                if (!Crustulum.getConfig('autoClicker')) return;
                Game.ClickCookie();
            },
        },
        'autoGolden': {
            'intervalId': null,
            'rate': 500,
            'onTick': ()=>{
                if (!Crustulum.getConfig('autoGolden')) return;
                Game.shimmers.forEach(function(shimmer) {
                    if (shimmer.type == "golden") { shimmer.pop() }
                })
            },
        },
        'autoReindeer': {
            'intervalId': null,
            'rate': 500,
            'onTick': ()=>{
                if (!Crustulum.getConfig('autoReindeer')) return;
                Game.shimmers.forEach(function(shimmer) {
                    if (shimmer.type == 'reindeer') { shimmer.pop() }
                })
            },
        },
        'autoNews': {
            'intervalId': null,
            'rate': 3000,
            'onTick': ()=>{
                if (!Crustulum.getConfig('autoNews')) return;
                if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') Game.tickerL.click();
            },
        },
        'infiniteCookies': {
            'intervalId': null,
            'rate': 100,
            'onTick': ()=>{
                if (!Crustulum.getConfig('infiniteCookies')) return;
                Game.cookies = Game.cookiesEarned;
            },
        },
        'infiniteMagic': {
            'intervalId': null,
            'rate': 1000,
            'onTick': ()=>{
                if (!Crustulum.getConfig('infiniteMagic')) return;
                if (Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.magicM)
                    Game.Objects['Wizard tower'].minigame.magic = Game.Objects['Wizard tower'].minigame.magicM;
            },
        },
        'infiniteSwaps': {
            'intervalId': null,
            'rate': 1000,
            'onTick': ()=>{
                if (!Crustulum.getConfig('infiniteSwaps')) return;
                if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) return;
                Game.Objects['Temple'].minigame.swaps=3;
                Game.Objects['Temple'].minigame.swapT=Date.now();
                Game.Objects['Temple'].minigame.lastSwapT=0;
            },
        },
    },
    PluginHooks: {
        Init: () => {
            Object.keys(Crustulum.Plugins).forEach((key) => {
                let plugin = Crustulum.Plugins[key];
                if (typeof plugin['Init'] === 'function') plugin['Init']();
            });
        },
        UnloadPlugins: () => {
            Object.keys(Crustulum.Plugins).forEach((key) => {
                let plugin = Crustulum.Plugins[key];
                if (typeof plugin['Unload'] === 'function') plugin['Unload']();
            });
        },
        UpdateMenu: (fragment) => {
            Object.keys(Crustulum.Plugins).forEach((key) => {
                let plugin = Crustulum.Plugins[key];
                if (typeof plugin['Game'] === 'object' && typeof plugin['Game']['UpdateMenu'] === 'function') plugin['Game']['UpdateMenu'](fragment);
            });
        },
    },
    Plugins: {}, // Plugins
};

// You can setup `CrustulumPlugins` (object) with your custom plugins before loading this script
if (typeof CrustulumPlugins === 'object') {
    Object.keys(CrustulumPlugins).forEach((key) => {
        let plugin = CrustulumPlugins[key];
        if (typeof plugin === 'object') {
            Crustulum.Plugins[key] = plugin;
            if (typeof Crustulum.Plugins[key]['Loaded'] === 'function') Crustulum.Plugins[key].Loaded();
        } else if (typeof plugin === 'function') {
            Crustulum.Plugins[key] = plugin;
            Crustulum.Plugins[key]();
        }
    });
}

// Alternatively, you can set CrustulumInit to false to prevent the Init and set up your plugins after loading the script, remember to call `Crustulum.Init()` afterwards.
if (typeof CrustulumInit === 'undefined' || CrustulumInit) Crustulum.Init();

/* cSpell:ignore Crustulum, Toggleables, prefs, minigame, Mult, grimoire, grimoire's, grimoire\'s, Cyclius, dragonflight, Achiev, jscolor */
