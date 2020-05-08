import fetch from 'node-fetch';

export const createMobilizationWithTemplate = async (mob) => {
  const createdMobilization = await fetch(`${process.env.API_REST_URL}/mobilizations`, {
    "headers": {
      "access-token": process.env.API_REST_TOKEN || '111111111',
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "body": JSON.stringify(mob),
    "method": "POST"
  }).then(res => res.json()).catch(err => console.error(err));

  // console.log('createdMobilization', createdMobilization);

  const getTemplateBySate = (state) => {
    switch (state) {
      case "AC": return 263;
      case "AL": return 264;
      case "AP": return 262;
      case "AM": return 265;
      case "BA": return 266;
      case "CE": return 267;
      case "DF": return 285;
      case "ES": return 268;
      case "GO": return 269;
      case "MA": return 270;
      case "MT": return 272;
      case "MS": return 271;
      case "MG": return 273;
      case "PA": return 274;
      case "PB": return 271;
      case "PR": return 287;
      case "PE": return 276;
      case "PI": return 277;
      case "RJ": return 275;
      case "RN": return 278;
      case "RS": return 279;
      case "RO": return 280;
      case "RR": return 281;
      case "SC": return 282;
      case "SP": return 261;
      case "SE": return 284;
      case "TO": return 283;
      default: return 0;
    }
  }

  const template_mobilization_id = getTemplateBySate(mob.mobilization.city)

  const t = JSON.stringify(Object.assign(createdMobilization, {
    "mobilization": {
      "id": createdMobilization.id,
      "template_mobilization_id": template_mobilization_id,
      "twitter_share_text": "Acabo de me juntar à mobilização dos estudantes pelo adiamento do Enem. Pressione os deputados agora:",
      "facebook_share_title": "Pressione agora pelo adiamento do Enem!",
      "facebook_share_description" : "Junte-se à mobilização dos estudantes do " + mob.city
    }
  }));

  // console.log(t);
  const updatedMobilization = await fetch(`${process.env.API_REST_URL}/mobilizations/${createdMobilization.id}`, {
    "headers": {
      "access-token": process.env.API_REST_TOKEN || '111111111',
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "body": t,
    "method": "PUT"
  }).then(res => res.json()).catch(err => console.error(err));

  // console.log('updatedMobilization', updatedMobilization);

  return updatedMobilization;
}
