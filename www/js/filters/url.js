app.filter('url', function($sce) { 
  return $sce.trustAsResourceUrl;
});