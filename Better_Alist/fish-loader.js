(function () {
  'use strict';
  var SCRIPTS = [
    '/Better_Alist/jq.js',
    '/Better_Alist/js/lib.js',
    '/Better_Alist/js/parallax.min.js',
    '/Better_Alist/js/app.bundle.js',
    '/Better_Alist/fish.js'
  ];

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      // 已存在相同 src 时直接完成
      if (document.querySelector('script[src="' + src + '"]')) return resolve();
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = resolve;
      s.onerror = function () { resolve(); }; // 容错：加载失败也继续后续脚本
      document.body.appendChild(s);
    });
  }

  function ensureContainer() {
    if (!document.getElementById('jsi-flying-fish-container')) {
      var d = document.createElement('div');
      d.id = 'jsi-flying-fish-container';
      d.className = 'fish-container';
      document.body.appendChild(d);
    }
  }

  function init() {
    ensureContainer();
    // 顺序加载脚本（若已存在则跳过）
    SCRIPTS.reduce(function (p, src) {
      return p.then(function () { return loadScript(src); });
    }, Promise.resolve());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();