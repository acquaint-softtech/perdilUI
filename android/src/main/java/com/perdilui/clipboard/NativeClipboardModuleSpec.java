package com.perdilui.clipboard;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactModuleWithSpec;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public abstract class NativeClipboardModuleSpec extends ReactContextBaseJavaModule implements ReactModuleWithSpec, TurboModule {
  public NativeClipboardModuleSpec(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  @DoNotStrip
  public abstract void getString(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getStrings(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getImagePNG(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getImageJPG(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void setImage(String content, Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getImage(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void setString(String content);

  @ReactMethod
  @DoNotStrip
  public abstract void setStrings(ReadableArray content);

  @ReactMethod
  @DoNotStrip
  public abstract void hasString(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void hasImage(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void hasURL(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void hasNumber(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void hasWebURL(Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void setListener();

  @ReactMethod
  @DoNotStrip
  public abstract void removeListener();

  @ReactMethod
  @DoNotStrip
  public abstract void addListener(String eventName);

  @ReactMethod
  @DoNotStrip
  public abstract void removeListeners(double count);
}
