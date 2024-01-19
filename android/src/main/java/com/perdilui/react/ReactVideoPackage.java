package com.perdilui.react;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.perdilui.exoplayer.DefaultReactExoplayerConfig;
import com.perdilui.exoplayer.ReactExoplayerConfig;
import com.perdilui.exoplayer.ReactExoplayerViewManager;

import java.util.Collections;
import java.util.List;

public class ReactVideoPackage implements ReactPackage {

    private ReactExoplayerConfig config;

    public ReactVideoPackage() {
    }

    public ReactVideoPackage(ReactExoplayerConfig config) {
        this.config = config;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    // Deprecated RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        if (config == null) {
            config = new DefaultReactExoplayerConfig(reactContext);
        }
        return Collections.singletonList(new ReactExoplayerViewManager(config));
    }
}
