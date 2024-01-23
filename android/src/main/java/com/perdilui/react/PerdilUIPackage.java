package com.perdilui.react;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.perdilui.clipboard.ClipboardModule;
import com.perdilui.exoplayer.DefaultReactExoplayerConfig;
import com.perdilui.exoplayer.ReactExoplayerConfig;
import com.perdilui.exoplayer.ReactExoplayerViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PerdilUIPackage implements ReactPackage {

    private ReactExoplayerConfig config;

    public PerdilUIPackage() {
    }

    public PerdilUIPackage(ReactExoplayerConfig config) {
        this.config = config;
    }


    // Deprecated RN 0.47
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ClipboardModule(reactContext));

        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        if (config == null) {
            config = new DefaultReactExoplayerConfig(reactContext);
        }
        return Collections.singletonList(new ReactExoplayerViewManager(config));
    }
}
