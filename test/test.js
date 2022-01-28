const assert = require('assert');
const checkFile = require('../utils/checkFile.js');

describe('checkFile', function () {
  describe('#fileExists()', function () {
    it('should return true when the file exists, false else', async () => {
      assert.equal(await checkFile.exists('example.txt'), true);
      assert.equal(await checkFile.exists('example.php'), false);
    });
  });
});
