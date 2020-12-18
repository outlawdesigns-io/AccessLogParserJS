let mod = (function(){
  const parseUserAgent = require('parse-user-agent');
  const IPPATTERN = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
  const LOCAHOSTPATTERN = /::1/;
  const DATEPATTERN = /\[(.*)\-?.([0][0-9]{3})]/;
  const METHODPATTERN = /"([A-Z]{3,7})\s\/?/;
  const QUERYPATTERN = /\"[A-Z]{3,7}\s(.*)HTTP/;
  const REFERRERPATTERN = /"http(.*)\/\/(.*)\"\w/;
  const RESPONSEPATTERN = /HTTP\/[0-9]\.[0-9]"\s([0-9]{3})/;
  const QUOTEPATTERN = /"([^"]*)"/;
  const LOOPBACKADDRESS = '127.0.0.1';
  const QUERYREPLACE = /\r\n|\r|\n|\||,/;
  const RFERRERREPLACE = /\"/;
  const RESPONSESIZEPATTERN = /"\s[0-9]{3}\s([0-9]{1,})\s/;

  return {
    parseIp(logStr){
      if(matches = logStr.match(LOCAHOSTPATTERN)){
        return LOOPBACKADDRESS;
      }
      if(matches = logStr.match(IPPATTERN)){
        return matches[0].trim();
      }
      return false;
    },
    parseDate(logStr){
      if(matches = logStr.match(DATEPATTERN)){
        let dateStr = matches[1].trim();
        let timePieces = dateStr.split(':');
        let datePieces = timePieces[0].split('/');
        return new Date(datePieces[1] + '/' + datePieces[0] + '/' + datePieces[2] + ' ' + timePieces[1] + ':' + timePieces[2] + ':' + timePieces[3]);
      }
      return false;
    },
    parseTimeZone(){
      return logStr.match(DATEPATTERN)[2].trim() || false;
    },
    parseMethod(logStr){
      return logStr.match(METHODPATTERN)[1].trim() || false;
    },
    parseQuery(logStr){
      return logStr.match(QUERYPATTERN)[1].replace(QUERYREPLACE,'').trim() || false;
    },
    parseReferrer(logStr){
      if(matches = logStr.match(REFERRERPATTERN)){
        return 'http' + matches[1].trim() + matches[2].replace(RFERRERREPLACE,'').trim();
      }
      return false;
    },
    parseResponseCode(logStr){
      return logStr.match(RESPONSEPATTERN)[1].trim() || false;
    },
    parseUserAgent(logStr){
      return parseUserAgent.parseUserAgent(logStr);
    },
    parseResponseSize(logStr){
      return logStr.match(RESPONSESIZEPATTERN)[1].trim() || false;
    },
    parseLine(logStr){
      return {
        ip_address:this.parseIp(logStr),
        responseCode:this.parseResponseCode(logStr),
        requestDate:this.parseDate(logStr),
        requestMethod:this.parseMethod(logStr),
        query:this.parseQuery(logStr),
        referrer:this.parseReferrer(logStr),
        ...this.parseUserAgent(logStr)
      }
    }
  }

}());

module.exports = mod;
