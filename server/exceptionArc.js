export function exceptionArc(arc, allcards, grouped) {
    const changeName = (name) => arc["archetype"] = name;
    const excludeMembers = (notMembers) => arc["members"] = arc["members"].filter(_=>!notMembers.includes(_.name));
    const includeMembers = (yesMembers) => {
        allcards.filter(_=>yesMembers.includes(_.name)).forEach((member)=>{
            if(!arc["members"].includes(member))
                arc["members"].push(member);
        });
    };
    const descIncludes = (word) => {
        allcards.filter(_=>_.desc.includes(word)).forEach((member)=>{
            if(!arc["members"].includes(member))
                arc["members"].push(member);
        });
    };
    const nameIncludes = (word) => {
        allcards.filter(_=>_.name.includes(word)).forEach((member)=>{
            if(!arc["members"].includes(member))
                arc["members"].push(member);
        });
    };
    const mergeWith = (toaddArc) => {
        const toaddObj = grouped.find(_=>_.archetype === toaddArc);
        toaddObj.members.forEach((member)=>{
            if(!arc["members"].includes(member))
                arc["members"].push(member);
        });
    }
    switch(arc.archetype) {
        case 'Shark': {
            excludeMembers(['Great White']);
            break;
        }
        case 'Frog': {
            excludeMembers(['Slime Toad']);
            break;
        }
        case 'Earthbound': {
            changeName('Earthbound Immortal');
            let notMembers = [
                'Earthbound Spirit',
                'Call of the Earthbound'
            ];
            excludeMembers(notMembers);
            break;
        }
        case 'Assault Mode': {
            changeName('/Assault Mode');
            descIncludes("Assault Mode Activate");
            break;
        }
        case 'Brave Token': {
            changeName('Adventurer Token');
            arc["true_name"] = arc["archetype"];
            break;
        }
        case 'Demise': {
            changeName('Ruin & Demise');
            let notMembers = [
                'Card of Demise',
                'Demise of the Land',
                'Jowls of Dark Demise',
                'Malice Doll of Demise',
                'The Earl of Demise'
            ];
            excludeMembers(notMembers);
            break;
        }
        case 'Egyptian God': {
            descIncludes("Slifer the Sky Dragon");
            descIncludes("Obelisk the Tormentor");
            descIncludes("The Winged Dragon of Ra");
            break;
        }
        case 'Firewall': {
            excludeMembers(['Firewall']);
            break;
        }
        case 'Fleur': {
            includeMembers(['Centaur Mina']);
            descIncludes('Fleur Synchron');
            excludeMembers(['Dogmatika Fleurdelis, the Knighted']);
            break;
        }
        case 'Herald': {
            let notMembers = [
                'Zeradias, Herald of Heaven',
                'Advanced Heraldry Art',
                'Augmented Heraldry',
                'Charged-Up Heraldry',
                'Heraldic Beast Aberconway',
                'Heraldic Beast Amphisbaena',
                'Heraldic Beast Basilisk',
                'Heraldic Beast Berners Falcon',
                'Heraldic Beast Eale',
                'Heraldic Beast Leo',
                'Heraldic Beast Twin-Headed Eagle',
                'Heraldic Beast Unicorn',
                'Heraldry Change',
                'Heraldry Reborn',
                'Heraldry Record',
                'Number 18: Heraldry Patriarch',
                'Number 69: Heraldry Crest',
                'Number 8: Heraldic King Genom-Heritage',
                'Number C69: Heraldry Crest of Horror'
            ];
            excludeMembers(notMembers);
            break;
        }
        case 'Starry Knight': {
            includeMembers(['Starry Night, Starry Dragon']);
            break;
        }
        case 'Nemesys': {
            changeName('Nemeses');
            descIncludes('nemeses');
            break;
        }
        case 'Sacred Beast': {
            descIncludes("Armityle the Chaos Phantasm");
            descIncludes("Hamon, Lord of Striking Thunder");
            descIncludes("Uria, Lord of Searing Flames");
            descIncludes("Raviel, Lord of Phantasms");
            break;
        }
        case 'Superheavy': {
            changeName('Superheavy Samurai');
            break;
        }
        case 'Train': {
            let notMembers = [
                'Amaze Attraction Thrill Train',
                'Amazoness Trainee',
                'Beautiful Beast Trainer',
                'D.D. Trainer',
                'Elemental Training',
                'Superheavy Samurai Steam Train King',
                'Training Fur Hire, Fur All Your Training Needs',
                'Yosen Training Grounds'
            ];
            excludeMembers(notMembers);
            break;
        }
        case 'Fossil': {
            let notMembers = [
                'Fossil Dig',
                'Fossil Excavation',
                'Fossil Tusker'
            ];
            excludeMembers(notMembers);
            descIncludes('Fossil Fusion')
            break;
        }
        case 'Scrap': {
            excludeMembers(['Raviel, Lord of Phantasms - Shimmering Scraper']);
            break;
        }
        case 'Worm': {
            arc["members"] = arc["members"]
                .filter(_=>{
                    return (_.type.toUpperCase().includes('MONSTER') &&
                            _.race === 'Reptile')
                        || !_.type.toUpperCase().includes('MONSTER')
                });
            includeMembers(['W Nebula Meteorite']);
            break;
        }
        case 'Majestic': {
            let notMembers = [
                'Majestic Mech - Goryu',
                'Majestic Mech - Ohka',
                'Majestic Mech - Senku',
                'Amaze Attraction Majestic Merry-Go-Round'
            ];
            excludeMembers(notMembers);
            includeMembers(['Arrive in Light']);
            break;
        }
        case 'Masked HERO': {
            descIncludes('"Change" Quick-Play');
            break;
        }
        case 'Evoltile': {
            mergeWith('Evolsaur');
            mergeWith('Evolzar');
            changeName("Evol");
            break;
        }
        case 'Volcanic': {
            mergeWith('Blaze Accelerator');
            break;
        }
        case 'Nordic':  {
            mergeWith('Aesir');
            break;
        }
        case 'HERO': {
            mergeWith('Elemental HERO');
            mergeWith('Destiny HERO');
            mergeWith('Masked HERO');
            mergeWith('Vision HERO');
            mergeWith('Evil HERO');
            break;
        }
        case 'The Agent': {
            mergeWith('Hyperion');
            break;
        }
        case 'Ninja': {
            mergeWith('Ninjitsu Art');
            break;
        }
        case 'Butterspy': {
            let yesMembers = [
                'Photon Papilloperative',
                'Night Papilloperative'
            ];
            includeMembers(yesMembers);
            break;
        }
        case 'Fire Fist': {
            mergeWith('Fire Formation');
            break;
        }
        case 'Evilswarm': {
            mergeWith('Infestation');
            break;
        }
        case 'Steelswarm': {
            mergeWith('Infestation');
            break;
        }
        case 'Onomato': {
            changeName('Onomat');
            descIncludes('Onomat');
            mergeWith('Gagaga');
            mergeWith('Dododo');
            nameIncludes('Zubaba');
            mergeWith('Gogogo');
            break;
        }
        case 'Tellarknight': {
            mergeWith('Stellarknight');
            break;
        }
        case 'Fluffal': {
            mergeWith('Frightfur');
            mergeWith('Edge Imp');
            break;
        }
        case 'Heraldic': {
            mergeWith('Heraldry');
            break;
        }
        case 'D/D': {
            mergeWith('Dark Contract');
            break;
        }
        case '@Ignister': {
            mergeWith('A.I.');
            break;
        }
        case 'Eldlich': {
            mergeWith('Golden Land');
            break;
        }
        case 'Infernoble Knight': {
            mergeWith('Roland');
            break;
        }
        case 'Evil★Twin': {
            mergeWith('Live☆Twin');
            changeName('Evil★Twin & Live☆Twin');
            break;
        }
        case 'Amazement': {
            mergeWith('Attraction');
            break;
        }
        case 'Infernoid': {
            mergeWith('Void');
            break;
        }
        case 'Infernity': {
            mergeWith('Void');
            break;
        }
        default: 
    }
}
