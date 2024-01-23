require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

Pod::Spec.new do |s|
  s.name           = 'perdil-ui'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source       = { :git => "git+https://github.com/acquaint-softtech/perdilUI.git", :tag => "#{s.version}" }
  s.ios.source_files = "ios/**/*.{h,m,mm}"
  s.osx.source_files = "macos/**/*.{h,m,mm}"

  s.ios.deployment_target = "8.0"
  s.tvos.deployment_target = "9.0"

  s.subspec "Video" do |ss|
    ss.source_files  = "ios/Video/*.{h,m}"
    s.static_framework = true
  end

  s.subspec "VideoCaching" do |ss|
    ss.dependency "perdil-ui/Video"
    ss.dependency "SPTPersistentCache", "~> 1.1.0"
    ss.dependency "DVAssetLoaderDelegate", "~> 0.3.1"

    ss.source_files = "ios/VideoCaching/**/*.{h,m}"
    s.static_framework = true
  end
  
  if fabric_enabled
    folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

    s.pod_target_xcconfig = {
      'HEADER_SEARCH_PATHS' => '"$(PODS_ROOT)/boost" "$(PODS_ROOT)/boost-for-react-native" "$(PODS_ROOT)/RCT-Folly"',
      'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    }
    s.platforms       = { ios: '11.0', tvos: '11.0' }
    s.compiler_flags  = folly_compiler_flags + ' -DRCT_NEW_ARCH_ENABLED'

    install_modules_dependencies(s)
  else
    s.platforms = { :ios => "9.0", :tvos => "9.0", :osx => "10.14" }

    s.dependency "React-Core"
  end
end
