/**
 * Perfect Idling Plugin for Crustulum
 * 
 * Adds buttons to toggle the Perfect idling achievement.
 * 
 * Load this file and then load Crustulum
 */

if (typeof CrustulumPlugins !== 'object') CrustulumPlugins = {};

CrustulumPlugins['perfectIdling'] = {
    Actions: { // Only ran when we call them
        perfectIdlingActivate: ()=>{
            let upgrade = Game.Upgrades['Perfect idling'];
            upgrade.unlocked = 1;
            upgrade.bought = 1;
            Game.upgradesToRebuild = 1;
            Crustulum.Game.UpdateMenu();
        },
        perfectIdlingDeactivate: ()=>{
            let upgrade = Game.Upgrades['Perfect idling'];
            upgrade.unlocked = 0;
            upgrade.bought = 0;
            Game.upgradesToRebuild = 1;
            Crustulum.Game.UpdateMenu();
        },
    },
    Game: { // Ran when Crustulum runs them
        UpdateMenu: (fragment) => { 
            fragment.appendChild(Crustulum.Menu.subheading('Crustulum: Perfect Idling'));
            if (Game.Has('Perfect idling')) fragment.appendChild(Crustulum.Menu.actionButton('perfectIdlingDeactivate','Deactivate Perfect Idling','Toggles perfect idling which makes cookies generate while the game is closed.', Crustulum.Plugins['perfectIdling'].Actions.perfectIdlingDeactivate));
            else fragment.appendChild(Crustulum.Menu.actionButton('perfectIdlingActivate','Activate Perfect Idling','Toggles perfect idling which makes cookies generate while the game is closed.', Crustulum.Plugins['perfectIdling'].Actions.perfectIdlingActivate));
        },
    },
};

/* cSpell:ignore Crustulum, Achiev */
