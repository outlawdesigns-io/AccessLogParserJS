const AccessLogParser = require('../index');
const expect = require('chai').expect;

process.env.TZ = 'America/Chicago'; 

let logStr = `64.128.132.200 - - [25/Aug/2021:13:01:26 -0500] "OPTIONS /song/search/album/Ravishing%20Grimness HTTP/1.1" 200 424 "https://outlawdesigns.io/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0"`;

describe('parseIp()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseIp()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return IP Address',function(){
      expect(AccessLogParser.parseIp(logStr)).to.equal('64.128.132.200');
    });
  });
});

describe('parseDate()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseDate()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return date',function(){
      expect(AccessLogParser.parseDate(logStr)).to.eql(new Date('2021-08-25T18:01:26.000Z'));
    });
  });
});

describe('parseMethod()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseMethod()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return http method',function(){
      expect(AccessLogParser.parseMethod(logStr)).to.equal('OPTIONS');
    });
  });
});

describe('parseQuery()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseQuery()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return query string',function(){
      expect(AccessLogParser.parseQuery(logStr)).to.equal('/song/search/album/Ravishing%20Grimness');
    });
  });
});

describe('parseReferrer()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseReferrer()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return referrer address',function(){
      expect(AccessLogParser.parseReferrer(logStr)).to.equal('https://outlawdesigns.io/');
    });
  });
});

describe('parseResponseCode()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseResponseCode()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return HTTP response code',function(){
      expect(AccessLogParser.parseResponseCode(logStr)).to.equal('200');
    });
  });
});

describe('parseResponseSize()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseResponseSize()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return number of bytes',function(){
      expect(AccessLogParser.parseResponseSize(logStr)).to.equal('424');
    });
  });
});

describe('parseLine()',function(){
  context('without arguments',function(){
    it('should return false',function(){
      expect(AccessLogParser.parseLine()).to.equal(false);
    });
  });
  context('with line from NCSA Combined log',function(){
    it('should return NCSA Combined log line object',function(){
      expect(AccessLogParser.parseLine(logStr)).to.eql(
        {
          browser_name:'Firefox',
          browser_version:'91.0',
          ip_address:'64.128.132.200',
          is_mobile:false,
          operating_system_name:'Windows',
          operating_system_version:'10.0',
          query:'/song/search/album/Ravishing%20Grimness',
          referrer:'https://outlawdesigns.io/',
          requestDate:new Date('2021-08-25T18:01:26.000Z'),
          requestMethod:'OPTIONS',
          responseCode:'200',
          responseSize:'424'
        }
        );
    });
  });
});
