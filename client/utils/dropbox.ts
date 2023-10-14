import { Dropbox } from 'dropbox';


export function getAccessTokenFromUrl() {
  return parseQueryString(window.location.hash).access_token;
}

export function isAuthenticated() {
  return !!getAccessTokenFromUrl();
}

export async function authenticateWithDropbox(client_id: string, redirect_uri: string) {
  const dbx = new Dropbox({ clientId: client_id });
  const authUrl = await dbx.auth.getAuthenticationUrl(redirect_uri);
  window.location.href = authUrl;
}

export async function getOrCreateSharedLink(dbx: Dropbox, file) {
  const response = await dbx.sharingListSharedLinks({ path: file.path_display });
  if (response.result.links && response.result.links.length > 0) {
      return response.result.links[0].url.replace('dl=0', 'raw=1');
  }

  const newLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({ path: file.path_display });
  return newLinkResponse.result.url.replace('dl=0', 'raw=1');
}

function parseQueryString(str: String) {
  const ret = Object.create(null);

  if (typeof str !== "string") {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, "");

  if (!str) {
    return ret;
  }

  str.split("&").forEach((param) => {
    const parts = param.replace(/\+/g, " ").split("=");
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    let key = parts.shift();
    let val = parts.length > 0 ? parts.join("=") : undefined;

    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}


