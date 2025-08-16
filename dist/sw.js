/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-4e60344b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index-CftXeAZB.css",
    "revision": null
  }, {
    "url": "assets/index-CzvAnh9f.js",
    "revision": null
  }, {
    "url": "assets/leaflet-Dgihpmma.css",
    "revision": null
  }, {
    "url": "chunks/ActivityDefinitions-B6dNeP4F.js",
    "revision": "1b692d9c770d7baefce5c6b97d3fd1d0"
  }, {
    "url": "chunks/AdvancedSearchModal-BZE3zJ3S.js",
    "revision": "13d835f2065f9a3dc6a152a271b59d5b"
  }, {
    "url": "chunks/AidCategories-4fqYukvc.js",
    "revision": "15ec194ec856534994dae53891acc505"
  }, {
    "url": "chunks/alert-circle-D6Smf8fy.js",
    "revision": "e1661aec065e86a1a5adcae9b4734348"
  }, {
    "url": "chunks/Analytics-C85l_Nvf.js",
    "revision": "163dd822ecf1b8494f2540ce5b3368bc"
  }, {
    "url": "chunks/Applications-Dwy8Eriy.js",
    "revision": "a48451f8b65946b836004204ceaac49d"
  }, {
    "url": "chunks/archive-F6asUjPp.js",
    "revision": "1b19b044d9becfbb79889fa6be6f1e23"
  }, {
    "url": "chunks/arrow-left-DR-zeoKx.js",
    "revision": "1a3ff6ae0848e5481c4848b67acf69f2"
  }, {
    "url": "chunks/BankDonations-DitcwM76.js",
    "revision": "aaba540d1a65ad88426911c1fa3df931"
  }, {
    "url": "chunks/BankOrders-C7DFUPG4.js",
    "revision": "57742d038006e31bff67c44766de154d"
  }, {
    "url": "chunks/Beneficiaries-B0_0Y-r3.js",
    "revision": "6905b2213525cc02be89ba38108622f1"
  }, {
    "url": "chunks/BeneficiariesDetail-B8HyRtE7.js",
    "revision": "547f0804ba9d05e3f6330ac0910abf84"
  }, {
    "url": "chunks/Buildings-DxaXe67R.js",
    "revision": "c9bb2970088377a4fa6d3ca4eaf3d65d"
  }, {
    "url": "chunks/BulkProvisioning-BOIBClyJ.js",
    "revision": "1930c96b5e0ce3bd2ea41861af140034"
  }, {
    "url": "chunks/BulkSend-BxPNe3yv.js",
    "revision": "d0c8b6065ab58d7e98e75764d095d322"
  }, {
    "url": "chunks/camera-yo22k8k7.js",
    "revision": "4e110722c36fcf1f544cc10ea194b8ae"
  }, {
    "url": "chunks/CameraScanner-CdpbR80l.js",
    "revision": "c9d62130e1c5cf055831e84d0344daec"
  }, {
    "url": "chunks/CashDonations-C7A0etbG.js",
    "revision": "2844b84a20547bae31a0215cea7be555"
  }, {
    "url": "chunks/CashOperations-YzaesAeY.js",
    "revision": "9e4fd636e10922aa329c11798a75410c"
  }, {
    "url": "chunks/CashVault-C37FzsdZ.js",
    "revision": "d4a823b8e2cbbd77dd98f05583cbff33"
  }, {
    "url": "chunks/CompleteReport-u-S09djE.js",
    "revision": "ecadb45d7d59e4c98df646fc347bccdf"
  }, {
    "url": "chunks/CountriesCities-CMqq9lm_.js",
    "revision": "a0e444fb9cd698f54af33af7c18d08bf"
  }, {
    "url": "chunks/CreditCardDonations-DPcK2cht.js",
    "revision": "10462f67a3927b5efb144505a96940ff"
  }, {
    "url": "chunks/DataControl-C4t3LY1s.js",
    "revision": "11e0cf434a6d5a1aaa7ebcb64ef22f6c"
  }, {
    "url": "chunks/DataTable-CBtBMNX8.js",
    "revision": "9f7af61b5b002b0ac7fb7323329da24e"
  }, {
    "url": "chunks/Definitions-DtyGB4kM.js",
    "revision": "98be12009d0b8062bc8165942ceb035d"
  }, {
    "url": "chunks/DeliveryTypes-C_lXGIJ9.js",
    "revision": "81ba8a982c264c29d67ece8f8131f19c"
  }, {
    "url": "chunks/DonationCard-DnJxaIqm.js",
    "revision": "2a5e642a855462ca3d10af494cfcb236"
  }, {
    "url": "chunks/DonationMethods-StrLm0mf.js",
    "revision": "8f212ea1d0dd0e23b62f69b51abfe1dd"
  }, {
    "url": "chunks/DonationNumbers-BIoykZVD.js",
    "revision": "562bd9df1e87a2613c37e199d16d1187"
  }, {
    "url": "chunks/DonationVault-DKlvsOD2.js",
    "revision": "47d551fffef5d3772c02b3de621d5412"
  }, {
    "url": "chunks/EDEL3XIZ.js-t6mgHs4B.js",
    "revision": "606f1c272686b327a0060fc6c7e3a54e"
  }, {
    "url": "chunks/EmailDeliveries-D2hGOfbr.js",
    "revision": "15d07f1da5dbf74893d38171856ab183"
  }, {
    "url": "chunks/exportToCsv-DLkyd1nM.js",
    "revision": "4e9dac98400f15503f984d4114639ea4"
  }, {
    "url": "chunks/eye-C9FxZSh9.js",
    "revision": "6f465d0f917342813f54bcb595d47ee7"
  }, {
    "url": "chunks/eye-off-DfaX89aY.js",
    "revision": "1765f8067eedbc13f6e461c76db6a100"
  }, {
    "url": "chunks/FundDefinitions-D0kmgtsH.js",
    "revision": "e843824e89395f5163a0bf5cec4aa596"
  }, {
    "url": "chunks/FundingDefinitions-C2sycqwG.js",
    "revision": "549380b2273bf895474faa1608a8c7dc"
  }, {
    "url": "chunks/FundMovements-BCDXJLRT.js",
    "revision": "774e0ba9ccfdcf0971e4dbb8954ccac7"
  }, {
    "url": "chunks/FundRegions-Cz8l6CHq.js",
    "revision": "11656d57dc59f587e484e1645d4ff9b4"
  }, {
    "url": "chunks/GeneralSettings-Enus232-.js",
    "revision": "8e0fc848cdab0f4176613d68706be406"
  }, {
    "url": "chunks/Groups-DD5cupGI.js",
    "revision": "87b57d950e229257350b901045162472"
  }, {
    "url": "chunks/GSMCodes-D5JVrEY3.js",
    "revision": "b33e2f96f2b1336ff0aab8ed7e52e135"
  }, {
    "url": "chunks/help-circle-bxe-pE9R.js",
    "revision": "8d39ae7f8145e41b8bbd524db9e3ce1e"
  }, {
    "url": "chunks/HospitalReferrals-DgOrdn84.js",
    "revision": "c784a3e08b2990f4248d7195969fa8fe"
  }, {
    "url": "chunks/html2canvas.esm.js-DVPEA5ss.js",
    "revision": "f04a1c63b514a1738bedad233eb7984e"
  }, {
    "url": "chunks/Index-B8RPlJLD.js",
    "revision": "958249249c9feccb1ad0565a46d31444"
  }, {
    "url": "chunks/Index-BG5oIOIN.js",
    "revision": "e6d94a73121cebf0410ec7e3fc1a58ab"
  }, {
    "url": "chunks/Index-BidunRO1.js",
    "revision": "89d01113bc6142a37d663d57cf67c741"
  }, {
    "url": "chunks/Index-CZ3nKWQX.js",
    "revision": "422c52ce244a379e81d6c4d347f95a9d"
  }, {
    "url": "chunks/Index-DSexqhnL.js",
    "revision": "d722c3598d5c0e0b9013259905bf5397"
  }, {
    "url": "chunks/Index-DtqJW0hd.js",
    "revision": "5401354f9388209f4dd9b07d2724c04b"
  }, {
    "url": "chunks/index-DX2TtJe9.js",
    "revision": "f726b1ccc769ad84edf363a1994ad2c4"
  }, {
    "url": "chunks/index.es.js-B4ktScAz.js",
    "revision": "2ea00d4184949b1ffe690c75a3a6c18e"
  }, {
    "url": "chunks/InKindOperations-Cf7xBa7U.js",
    "revision": "7d5d8ad8184269618f48c708c9c6df8a"
  }, {
    "url": "chunks/Institutions-DgFCRgsX.js",
    "revision": "3497582b71b8d608bf42b7175a3caab4"
  }, {
    "url": "chunks/InstitutionStatus-B2QKBmFL.js",
    "revision": "d928ba53044e0c90985254b67ac46526"
  }, {
    "url": "chunks/InstitutionTypes-BJ8mZhxW.js",
    "revision": "e99a67025a415decb1efe41f58a52f5b"
  }, {
    "url": "chunks/InterfaceLanguages-Bo0lB5wu.js",
    "revision": "c53a3b8cbccd95b09667bc9cc873204c"
  }, {
    "url": "chunks/InternalLines-C1lPhtGP.js",
    "revision": "68fb954442293c90b412564d4a827933"
  }, {
    "url": "chunks/IPBlocking-cdQuxAQF.js",
    "revision": "561b23e9d653e3b259adaba9008b6465"
  }, {
    "url": "chunks/jspdf.plugin.autotable-BhjKYg0a.js",
    "revision": "d513de02b0bac253a01326e0072dc67b"
  }, {
    "url": "chunks/LazyCameraScanner-HjHq8x4r.js",
    "revision": "b164e3cefb1d0650c85a10e5a295cd9c"
  }, {
    "url": "chunks/LazyQRScannerModal-CzWTefVC.js",
    "revision": "200403531eee784cd1311853f5bd9493"
  }, {
    "url": "chunks/leaflet-ChEFjLjA.js",
    "revision": "45e00e616edfbfd9f7aad0114e8c37b8"
  }, {
    "url": "chunks/LineChart-BXkcIvJM.js",
    "revision": "7552e75b943dcbc6470e870a2fb2398f"
  }, {
    "url": "chunks/List-BV-zEVea.js",
    "revision": "e1e2169f5c78dc0e7583a902c6a07cb1"
  }, {
    "url": "chunks/LocalIPs-PEJu3pph.js",
    "revision": "2236983a7dd4b727a81278f3517f19c3"
  }, {
    "url": "chunks/lock-CY786ctS.js",
    "revision": "a8f939d8ca3e747749ee908df64b9209"
  }, {
    "url": "chunks/Login-D2BsxIU9.js",
    "revision": "920c7869d90ed1a3e017738439b24f5d"
  }, {
    "url": "chunks/MeetingRequests-DvJW88SG.js",
    "revision": "32f3df80261f344c20cf7dd3631d23ed"
  }, {
    "url": "chunks/MessageNavigation-DaT1td-g.js",
    "revision": "1b16afedd837f02cd77a98f6a906e370"
  }, {
    "url": "chunks/Modal-CXkm-C8J.js",
    "revision": "b2ac4c41fb3ccb25d28198821134ce28"
  }, {
    "url": "chunks/ModuleInfo-DiVcUVEH.js",
    "revision": "87e2df9d9842bbe361e74ee3fddfe5ea"
  }, {
    "url": "chunks/ModuleInfo-gUjEm6SP.js",
    "revision": "333f766691ef264ae446a7d0538b1f22"
  }, {
    "url": "chunks/ModuleInfo-u-V5O_5f.js",
    "revision": "402cd83488275eb3fb8d9a57920853dc"
  }, {
    "url": "chunks/NotFound-iOp01NNx.js",
    "revision": "8fcd33ad86179908d0c179bde67c2367"
  }, {
    "url": "chunks/OnlineDonations-BJvhYNiU.js",
    "revision": "9d1fbef69f4762621d90a035506a200a"
  }, {
    "url": "chunks/OrphansStudents-DF0LRqi7.js",
    "revision": "c0e7ad3033b92a60e675a89c2e9b26d7"
  }, {
    "url": "chunks/Parameters-DfjoSTlg.js",
    "revision": "ad245786d617b215d878f9c874d42110"
  }, {
    "url": "chunks/PassportFormats-BgHiDx-h.js",
    "revision": "997d740547c167fa31651513d8fb2835"
  }, {
    "url": "chunks/pdfExport-BBuOquMH.js",
    "revision": "97448b9aeee8bfd0e93f96904efa9e6a"
  }, {
    "url": "chunks/pen-q88GhGGm.js",
    "revision": "bfa6447c2fa34861d53f41641912dbf6"
  }, {
    "url": "chunks/pen-square-DRhBp83i.js",
    "revision": "96ceac4e5df1a24d07d95b6cb2973ef5"
  }, {
    "url": "chunks/PermissionGroupsClean-Br7OPE8W.js",
    "revision": "c89222018ae170cb34034008c15bbaf1"
  }, {
    "url": "chunks/PieChart-Dx2kjMxN.js",
    "revision": "489498eff2dc7607a1e908a8a9eb0d7d"
  }, {
    "url": "chunks/PiggyBankTracking-BK_DgmGU.js",
    "revision": "6945cdac64a387698ac63c1dfab565ed"
  }, {
    "url": "chunks/ProcessFlows-zlmA5fMj.js",
    "revision": "c61b56de1d8ae731c2e4311a611721fc"
  }, {
    "url": "chunks/purify.es.js-BidOWZMd.js",
    "revision": "16ce63df72ce86645fb7a6cd57e0ae05"
  }, {
    "url": "chunks/qr-code-ClBpt0Ly.js",
    "revision": "5fa7115a0c56a7f77cbdf07da22a73c9"
  }, {
    "url": "chunks/qr-scanner-worker.min.js-k9yJ__Ac.js",
    "revision": "afa4cdf09bc83a51545956aa5d3219c6"
  }, {
    "url": "chunks/qrCodeUtils-EWtYda1B.js",
    "revision": "3a0020a693b8db6a6849c4cd15189d56"
  }, {
    "url": "chunks/QRScannerModal-BuR6q9r9.js",
    "revision": "5eee4fe4736e56ed8231a25796d83041"
  }, {
    "url": "chunks/RamadanPeriods-B4UiCb04.js",
    "revision": "2a4eeee2f373f860e140238f27dba207"
  }, {
    "url": "chunks/RechartsBundle-B8I5C_ai.js",
    "revision": "0d882c2e933d81c4d3e223d42addc97a"
  }, {
    "url": "chunks/Reports-Crs9NKln.js",
    "revision": "4fd86b34f98c313b212c24b3764ecb8d"
  }, {
    "url": "chunks/Reports-Cs3fSj7f.js",
    "revision": "935a41ef54ae23d949cad2097a42e222"
  }, {
    "url": "chunks/SacrificePeriods-D1ZnWEhV.js",
    "revision": "17780f767efad14ff64db08de5444385"
  }, {
    "url": "chunks/SacrificeShares-BgM1JtFC.js",
    "revision": "9ce506d4e64c345fdf9ca18ba86baec9"
  }, {
    "url": "chunks/sanitization-DKE2yZnW.js",
    "revision": "8b03195767dcd1197321b1d921daa368"
  }, {
    "url": "chunks/ServiceTracking-Cda2ruqp.js",
    "revision": "22509ac136eaea74ba11ae5fe2827da3"
  }, {
    "url": "chunks/SmsDeliveries-0iV4gpS1.js",
    "revision": "d030e00ae4dd462de786cd91031315f2"
  }, {
    "url": "chunks/SourcesExpenses-BqQraG2b.js",
    "revision": "531c881a5f0e30f77041a47f92512ff9"
  }, {
    "url": "chunks/StatCard-3Oaqvq3F.js",
    "revision": "f150afb4ee36f2b41b77482005eae736"
  }, {
    "url": "chunks/StructuralControls-Ds5TCG7U.js",
    "revision": "df8677a890ce5e03a0ece9440d3561a7"
  }, {
    "url": "chunks/SupabaseTest-C-l10Txd.js",
    "revision": "2852dd172dddcf04508631ed6a7c4931"
  }, {
    "url": "chunks/tabs-CHIKmhso.js",
    "revision": "5d7146cc312fff7685bae0c7e6825c1e"
  }, {
    "url": "chunks/target-M3P5B6If.js",
    "revision": "5ba778fb8b10928abadfadafd182d8e7"
  }, {
    "url": "chunks/Templates-GUhQVxbU.js",
    "revision": "d462ff87b28fd8cc0eb4af405e1cd298"
  }, {
    "url": "chunks/Translations-C0k5CHYb.js",
    "revision": "1a0ec598fed1bcd9829435f19a95e85d"
  }, {
    "url": "chunks/trending-down-I1rcrN6k.js",
    "revision": "fd86c8bb7418f2c5df7c621ac792f466"
  }, {
    "url": "chunks/types-C2SbTJX7.js",
    "revision": "19e433a8b7d854a8790fbef858cfc78c"
  }, {
    "url": "chunks/UnitRoles-BoPwn4lQ.js",
    "revision": "83891cdf081e94394f8cb3a43b1f4e73"
  }, {
    "url": "chunks/Units-C6UIByJU.js",
    "revision": "0126c56d0c183fb97313230339efe474"
  }, {
    "url": "chunks/upload-k88toyIE.js",
    "revision": "4d86e467cd100ed023b383c964e37ea2"
  }, {
    "url": "chunks/UserAccounts-DJ14cVgQ.js",
    "revision": "2e392d4014bfcec2f58304eeeae744b3"
  }, {
    "url": "chunks/UserManagement-BRDaBTmN.js",
    "revision": "045414c6aec8d9894a8d9b9b33f04660"
  }, {
    "url": "chunks/useSanitization-DkUin8eO.js",
    "revision": "93fdcf843e63e5e18307c69f74bdadbe"
  }, {
    "url": "chunks/useSwipeGestures-wP2OMhWD.js",
    "revision": "879870911adbf300fc73993429186015"
  }, {
    "url": "chunks/useUserManagement-DZf5VBlD.js",
    "revision": "797d31c93c9a4ac1fc28827396713271"
  }, {
    "url": "chunks/video-Cg_1xTsf.js",
    "revision": "53a772a418ba1dd14d59a91944589e16"
  }, {
    "url": "chunks/WarningMessages-DIacGhIT.js",
    "revision": "220bcd8bebbbd044934f17297670fefd"
  }, {
    "url": "chunks/WorkAreas-ClMWBSd1.js",
    "revision": "12a8f45add5a847514252f8206e6e892"
  }, {
    "url": "chunks/x-circle-BRbDRZDo.js",
    "revision": "523b78f3a2db5897fbbc2e265cc0c859"
  }, {
    "url": "icon-192x192.png",
    "revision": "2fcb5e5187570f932fa37a0d5a4223b4"
  }, {
    "url": "icon-512x512.png",
    "revision": "69ce23660eaaa9f39c26753e5a886376"
  }, {
    "url": "index.html",
    "revision": "aea2493d888cfcf52a52c1bac98667b2"
  }, {
    "url": "offline.html",
    "revision": "10532fe08df0d2c98455b3cd0eff3e5a"
  }, {
    "url": "pwa-192x192.svg",
    "revision": "6b86e73413696a650b55e611e1f34e30"
  }, {
    "url": "pwa-512x512.svg",
    "revision": "3eee606da5851a309897b81e3ea38d46"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "stats.html",
    "revision": "c4828c05463ba59ed56956409476d6d9"
  }, {
    "url": "vite.svg",
    "revision": "8e3a10e157f75ada21ab742c022d5430"
  }, {
    "url": "icon-192x192.png",
    "revision": "2fcb5e5187570f932fa37a0d5a4223b4"
  }, {
    "url": "icon-512x512.png",
    "revision": "69ce23660eaaa9f39c26753e5a886376"
  }, {
    "url": "manifest.webmanifest",
    "revision": "b67846caecb1e2747ff752d74657ac8f"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/api\./, new workbox.NetworkFirst({
    "cacheName": "api-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 86400
    })]
  }), 'GET');
  workbox.registerRoute(/\.(png|jpg|jpeg|svg|gif)$/, new workbox.CacheFirst({
    "cacheName": "images-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 2592000
    })]
  }), 'GET');
  workbox.registerRoute(/\.(js|css|html)$/, new workbox.StaleWhileRevalidate({
    "cacheName": "static-resources",
    plugins: []
  }), 'GET');

}));
