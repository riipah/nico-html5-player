/******/
!function(e) {
    function t(r) {
        if (n[r])
            return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    // webpackBootstrap
    /******/
    var n = {};
    return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
}([function(e, t, n) {
    "use strict";
    var r = n(1);
    !function() {
        window.onNicoPlayerFactoryReady ? window.onNicoPlayerFactoryReady(r["default"]) : window.addEventListener("load", function() {
            window.onNicoPlayerFactoryReady && window.onNicoPlayerFactoryReady(r["default"])
        })
    }()
}
, function(e, t, n) {
    "use strict";
    var r, o = n(2), i = n(8);
    !function(e) {
        function t(e, t, s) {
            var a = new o["default"](e,(r++).toString(),t,i["default"].createProtocolAdjuster(/^https:/.test(window.location.protocol)),s)
              , h = s || {}
              , u = h.onSuccess
              , c = void 0 === u ? function(e) {}
            : u
              , l = h.onError
              , p = void 0 === l ? function(e) {}
            : l;
            if (n())
                return new Promise(function(e, t) {
                    a.createPlayer(function(t) {
                        e(t),
                        c(t)
                    }, function(e) {
                        t(e)
                    })
                }
                )["catch"](function(e) {
                    try {
                        p(e)
                    } catch (e) {}
                    return Promise.reject(e)
                });
            try {
                return a.createPlayer(c, p)
            } catch (f) {
                p(f)
            }
        }
        function n() {
            return "undefined" != typeof Promise
        }
        var r = 1;
        e.create = t
    }(r = t.NicoPlayerFactory || (t.NicoPlayerFactory = {})),
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = r
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }()
      , i = n(3)
      , s = (n(5),
    n(6))
      , a = function() {
        function e(t, n, o, i, a) {
            r(this, e),
            this.parentElement = t,
            this.playerId = n,
            this.watchId = o,
            this.adjustProtocol = i,
            this._playerMetadata = {
                currentTime: void 0,
                maximumBuffered: void 0,
                muted: void 0,
                volume: void 0,
                duration: void 0
            },
            this._playerStatus = 0,
            this.EMBED_PLAYER_BASE_PATH = "/watch/",
            this.EMBED_PLAYER_URL = s.config.servers.extplayerv,
            this.EMBED_PLAYER_DOMAIN = s.config.servers.extplayervDomain,
            this.initialSize = {
                width: a && a.width || 640,
                height: a && a.height || 360
            },
            this.playOptions = {
                noRelatedVideo: a && a.noRelatedVideo || !1,
                autoplay: a && a.autoplay || !1,
                defaultNoComment: a && a.defaultNoComment || !1,
                noLinkToNiconico: a && a.noLinkToNiconico || !1,
                noController: a && a.noController || !1,
                noHeader: a && a.noHeader || !1,
                noTags: a && a.noTags || !1,
                noShare: a && a.noShare || !1,
                noVideoDetail: a && a.noVideoDetail || !1,
                allowProgrammaticFullScreen: !a || "undefined" == typeof a.allowProgrammaticFullScreen || a.allowProgrammaticFullScreen
            },
            this.url = window.location.href
        }
        return o(e, [{
            key: "createPlayer",
            value: function(t, n) {
                var r = this;
                this.iframeElement = e.createAndAppendIframe({
                    src: "" + this.adjustProtocol(this.EMBED_PLAYER_URL) + this.EMBED_PLAYER_BASE_PATH + encodeURIComponent(this.watchId) + "?jsapi=1&playerId=" + this.playerId + "&" + this.optionsToQuery(this.playOptions),
                    width: this.initialSize.width,
                    height: this.initialSize.height
                }, this.parentElement),
                this.connector = new i.ControllerIFrameConnector(this.playerId,this.adjustProtocol(this.EMBED_PLAYER_DOMAIN),this.iframeElement);
                var o = null;
                this.connector.eventEmitter.on("playerStatusChange", function(e) {
                    r._playerStatus = e.playerStatus
                }).on("playerMetadataChange", function(e) {
                    r._playerMetadata = e
                }).on("enterProgrammaticFullScreen", function() {
                    o || (o = i.IFrameConnector.programmaticFullScreen(r.iframeElement))
                }).on("exitProgrammaticFullScreen", function() {
                    o && o(),
                    o = null
                });
                var s = function(e) {
                    n(new Error(e.message))
                };
                this.connector.eventEmitter.once("loadComplete", function(e) {
                    r._videoInfo = e.videoInfo,
                    r.connector.eventEmitter.removeListener("error", s),
                    t(r)
                }).once("error", s)
            }
        }, {
            key: "width",
            value: function(e) {
                return "undefined" != typeof e ? (this.iframeElement.width = e.toString(),
                this) : parseInt(this.iframeElement.width, 10)
            }
        }, {
            key: "height",
            value: function(e) {
                return "undefined" != typeof e ? (this.iframeElement.height = e.toString(),
                this) : parseInt(this.iframeElement.height, 10)
            }
        }, {
            key: "currentTime",
            value: function(e) {
                return "undefined" != typeof e ? (this.connector.eventEmitter.emit("seek", {
                    time: e
                }),
                this) : this._playerMetadata.currentTime
            }
        }, {
            key: "muted",
            value: function(e) {
                return "undefined" != typeof e ? (this.connector.eventEmitter.emit("mute", {
                    mute: e
                }),
                this) : this._playerMetadata.muted
            }
        }, {
            key: "volume",
            value: function(e) {
                return "undefined" != typeof e ? (this.connector.eventEmitter.emit("volumeChange", {
                    volume: e
                }),
                this) : this._playerMetadata.volume
            }
        }, {
            key: "maximumBuffered",
            value: function() {
                return this._playerMetadata.maximumBuffered
            }
        }, {
            key: "duration",
            value: function() {
                return this._playerMetadata.duration
            }
        }, {
            key: "videoInfo",
            value: function() {
                return this._videoInfo
            }
        }, {
            key: "playerStatus",
            value: function() {
                switch (this._playerStatus) {
                case 0:
                    return "unplayed";
                case 1:
                    return "loading";
                case 2:
                    return "playing";
                case 3:
                    return "pausing";
                case 4:
                    return "finished"
                }
            }
        }, {
            key: "play",
            value: function() {
                this.connector.eventEmitter.emit("play", void 0)
            }
        }, {
            key: "pause",
            value: function() {
                this.connector.eventEmitter.emit("pause", void 0)
            }
        }, {
            key: "addEventListener",
            value: function(e, t) {
                this.connector.eventEmitter.on(e, t)
            }
        }, {
            key: "removeEventListener",
            value: function(e, t) {
                this.connector.eventEmitter.removeListener(e, t)
            }
        }, {
            key: "dispose",
            value: function() {
                this.connector.dispose(),
                this.parentElement.removeChild(this.iframeElement)
            }
        }, {
            key: "optionsToQuery",
            value: function(e) {
                return Object.keys(e).filter(function(t) {
                    return e[t]
                }).map(function(e) {
                    return e + "=1"
                }).join("&")
            }
        }]),
        e
    }();
    !function(e) {
        function t(e, t) {
            var n = document.createElement("iframe");
            return n.setAttribute("allowfullscreen", "allowfullscreen"),
            n.setAttribute("frameborder", "0"),
            n.width = e.width.toString(),
            n.height = e.height.toString(),
            n.src = e.src,
            t.appendChild(n),
            "none" === window.getComputedStyle(n).getPropertyValue("max-width") && (n.style.maxWidth = "100%"),
            n
        }
        e.createAndAppendIframe = t
    }(a || (a = {})),
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = a
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }
    function o(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function i(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    var s = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }()
      , a = n(4)
      , h = function() {
        function e(t, n) {
            var r = this;
            i(this, e),
            this.playerId = t,
            this.targetDomain = n,
            this._eventEmitter = new a.EventEmitter,
            this.messageEventFunction = function(e) {
                r.receiveMessage(e)
            }
            ,
            window.addEventListener("message", this.messageEventFunction),
            Object.keys(this.listeningEvents()).forEach(function(e) {
                return r.eventEmitter.on(e, function(t) {
                    return r.postMessage(e, t)
                })
            })
        }
        return s(e, [{
            key: "dispose",
            value: function() {
                window.removeEventListener("message", this.messageEventFunction),
                this._eventEmitter.removeAllListeners()
            }
        }, {
            key: "receiveMessage",
            value: function(e) {
                this.isTarget(e) && this._eventEmitter.emit(e.data.eventName, e.data.data)
            }
        }, {
            key: "isTarget",
            value: function(e) {
                return e.origin === this.targetDomain && (e.data.sourceConnectorType === this.targetConnectorType && e.data.playerId === this.playerId)
            }
        }, {
            key: "eventEmitter",
            get: function() {
                return this._eventEmitter
            }
        }]),
        e
    }();
    t.IFrameConnector = h;
    var u = function(e) {
        function t(e, n, o) {
            i(this, t);
            var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
            return s.iframeElement = o,
            s.connectorType = h.ConnectorType.controller,
            s.targetConnectorType = h.ConnectorType.player,
            s
        }
        return o(t, e),
        s(t, [{
            key: "postMessage",
            value: function(e, t) {
                this.iframeElement.contentWindow.postMessage({
                    sourceConnectorType: this.connectorType,
                    playerId: this.playerId,
                    eventName: e,
                    data: t
                }, this.targetDomain)
            }
        }, {
            key: "listeningEvents",
            value: function() {
                return {
                    play: !0,
                    pause: !0,
                    seek: !0,
                    mute: !0,
                    volumeChange: !0
                }
            }
        }]),
        t
    }(h);
    t.ControllerIFrameConnector = u;
    var c = function(e) {
        function t() {
            i(this, t);
            var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
            return e.connectorType = h.ConnectorType.player,
            e.targetConnectorType = h.ConnectorType.controller,
            e
        }
        return o(t, e),
        s(t, [{
            key: "postMessage",
            value: function(e, t) {
                window.parent.postMessage({
                    sourceConnectorType: this.connectorType,
                    playerId: this.playerId,
                    eventName: e,
                    data: t
                }, this.targetDomain)
            }
        }]),
        t
    }(h);
    t.PlayerIFrameConnectorBase = c;
    var l = function(e) {
        function t() {
            return i(this, t),
            r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return o(t, e),
        s(t, [{
            key: "listeningEvents",
            value: function() {
                return {
                    loadComplete: !0,
                    error: !0,
                    playerStatusChange: !0,
                    playerMetadataChange: !0
                }
            }
        }]),
        t
    }(c);
    t.PlayerIFrameConnector = l;
    var p = function(e) {
        function t() {
            return i(this, t),
            r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return o(t, e),
        s(t, [{
            key: "listeningEvents",
            value: function() {
                return {
                    enterProgrammaticFullScreen: !0,
                    exitProgrammaticFullScreen: !0
                }
            }
        }]),
        t
    }(c);
    t.PlayerFullScreenIFrameConnector = p,
    function(e) {
        var t;
        !function(e) {
            e[e.player = 0] = "player",
            e[e.controller = 1] = "controller"
        }(t = e.ConnectorType || (e.ConnectorType = {})),
        e.programmaticFullScreen = function(e) {
            function t() {
                if (!s) {
                    var t = window.innerWidth >= window.innerHeight
                      , o = (t ? window.innerWidth : window.innerHeight) + "px"
                      , i = (t ? window.innerHeight : window.innerWidth) + "px";
                    e.style.width === o && e.style.height === i || (e.style.setProperty("width", o, "important"),
                    e.style.setProperty("height", i, "important"),
                    window.scrollTo(0, 0)),
                    t !== u && (u = t,
                    t ? (e.style.setProperty("transform", "none", "important"),
                    e.style.setProperty("-webkit-transform", "none", "important"),
                    e.style.setProperty("left", "0", "important")) : (e.style.setProperty("transform", "rotate(90deg)", "important"),
                    e.style.setProperty("-webkit-transform", "rotate(90deg)", "important"),
                    e.style.setProperty("left", "100%", "important"))),
                    r = setTimeout(n, 200)
                }
            }
            function n() {
                window.requestAnimationFrame ? window.requestAnimationFrame(t) : t()
            }
            var r, o = ["width", "height", "top", "left", "position", "z-index", "max-width", "transform", "-webkit-transform", "transform-origin", "-webkit-transform-origin"], i = o.reduce(function(t, n) {
                return t[n] = {
                    value: e.style.getPropertyValue(n),
                    priority: e.style.getPropertyPriority(n)
                },
                t
            }, {}), s = !1, a = window.scrollX, h = window.scrollY, u = null;
            return n(),
            e.style.setProperty("top", "0", "important"),
            e.style.setProperty("position", "fixed", "important"),
            e.style.setProperty("z-index", "2147483647", "important"),
            e.style.setProperty("max-width", "none", "important"),
            e.style.setProperty("transform-origin", "0% 0%", "important"),
            e.style.setProperty("-webkit-transform-origin", "0% 0%", "important"),
            function() {
                o.forEach(function(t) {
                    var n = i[t];
                    e.style.removeProperty(t),
                    e.style.setProperty(t, n.value, n.priority)
                }),
                clearTimeout(r),
                s = !0,
                window.scrollTo(a, h)
            }
        }
    }(h = t.IFrameConnector || (t.IFrameConnector = {}))
}
, function(e, t) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    function n() {
        this._events = this._events || {},
        this._maxListeners = this._maxListeners || void 0
    }
    function r(e) {
        return "function" == typeof e
    }
    function o(e) {
        return "number" == typeof e
    }
    function i(e) {
        return "object" == typeof e && null !== e
    }
    function s(e) {
        return void 0 === e
    }
    e.exports = n,
    n.EventEmitter = n,
    n.prototype._events = void 0,
    n.prototype._maxListeners = void 0,
    n.defaultMaxListeners = 10,
    n.prototype.setMaxListeners = function(e) {
        if (!o(e) || e < 0 || isNaN(e))
            throw TypeError("n must be a positive number");
        return this._maxListeners = e,
        this
    }
    ,
    n.prototype.emit = function(e) {
        var t, n, o, a, h, u;
        if (this._events || (this._events = {}),
        "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
            if (t = arguments[1],
            t instanceof Error)
                throw t;
            var c = new Error('Uncaught, unspecified "error" event. (' + t + ")");
            throw c.context = t,
            c
        }
        if (n = this._events[e],
        s(n))
            return !1;
        if (r(n))
            switch (arguments.length) {
            case 1:
                n.call(this);
                break;
            case 2:
                n.call(this, arguments[1]);
                break;
            case 3:
                n.call(this, arguments[1], arguments[2]);
                break;
            default:
                a = Array.prototype.slice.call(arguments, 1),
                n.apply(this, a)
            }
        else if (i(n))
            for (a = Array.prototype.slice.call(arguments, 1),
            u = n.slice(),
            o = u.length,
            h = 0; h < o; h++)
                u[h].apply(this, a);
        return !0
    }
    ,
    n.prototype.addListener = function(e, t) {
        var o;
        if (!r(t))
            throw TypeError("listener must be a function");
        return this._events || (this._events = {}),
        this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t),
        this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
        i(this._events[e]) && !this._events[e].warned && (o = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners,
        o && o > 0 && this._events[e].length > o && (this._events[e].warned = !0,
        "function" == typeof console.trace)),
        this
    }
    ,
    n.prototype.on = n.prototype.addListener,
    n.prototype.once = function(e, t) {
        function n() {
            this.removeListener(e, n),
            o || (o = !0,
            t.apply(this, arguments))
        }
        if (!r(t))
            throw TypeError("listener must be a function");
        var o = !1;
        return n.listener = t,
        this.on(e, n),
        this
    }
    ,
    n.prototype.removeListener = function(e, t) {
        var n, o, s, a;
        if (!r(t))
            throw TypeError("listener must be a function");
        if (!this._events || !this._events[e])
            return this;
        if (n = this._events[e],
        s = n.length,
        o = -1,
        n === t || r(n.listener) && n.listener === t)
            delete this._events[e],
            this._events.removeListener && this.emit("removeListener", e, t);
        else if (i(n)) {
            for (a = s; a-- > 0; )
                if (n[a] === t || n[a].listener && n[a].listener === t) {
                    o = a;
                    break
                }
            if (o < 0)
                return this;
            1 === n.length ? (n.length = 0,
            delete this._events[e]) : n.splice(o, 1),
            this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
    }
    ,
    n.prototype.removeAllListeners = function(e) {
        var t, n;
        if (!this._events)
            return this;
        if (!this._events.removeListener)
            return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e],
            this;
        if (0 === arguments.length) {
            for (t in this._events)
                "removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"),
            this._events = {},
            this
        }
        if (n = this._events[e],
        r(n))
            this.removeListener(e, n);
        else if (n)
            for (; n.length; )
                this.removeListener(e, n[n.length - 1]);
        return delete this._events[e],
        this
    }
    ,
    n.prototype.listeners = function(e) {
        var t;
        return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }
    ,
    n.prototype.listenerCount = function(e) {
        if (this._events) {
            var t = this._events[e];
            if (r(t))
                return 1;
            if (t)
                return t.length
        }
        return 0
    }
    ,
    n.listenerCount = function(e, t) {
        return e.listenerCount(t)
    }
}
, function(e, t) {
    "use strict";
    e.exports = {}
}
, function(e, t, n) {
    "use strict";
    t.config = n(7)._publicConfig
}
, function(e, t) {
    "use strict";
    t._publicConfig = {
        servers: {
            extplayerv: "http://embed.nicovideo.jp",
            extplayervDomain: "http://embed.nicovideo.jp",
            extplayervRes: "http://embed.res.nimg.jp",
            nicovideo: "http://www.nicovideo.jp",
            nicovideoSpweb: "http://sp.nicovideo.jp",
            channel: "http://ch.nicovideo.jp",
            thumbWatch: "http://ext.nicovideo.jp",
            flapi: "http://flapi.nicovideo.jp",
            nicobus: "https://public.api.nicovideo.jp",
            secureRes: "https://secure-dcdn.cdn.nimg.jp",
            ads: "http://ads.nicovideo.jp"
        }
    }
}
, function(e, t, n) {
    "use strict";
    var r, o = n(9), i = n(6);
    !function(e) {
        function t(e) {
            var t = e % 60;
            return (e - t) / 60 + ":" + (t < 10 ? "0" : "") + t
        }
        function n(e, t) {
            var n = function r(e) {
                document.removeEventListener("mousemove", t.onMove),
                document.removeEventListener("mouseup", r),
                t.onEnd(e)
            };
            document.addEventListener("mousemove", t.onMove),
            document.addEventListener("mouseup", n),
            t.onStart(e)
        }
        function r(e) {
            return e ? Object.keys(e).reduce(function(t, n, r) {
                return "" + t + (0 === r ? "?" : "&") + encodeURIComponent(n) + "=" + encodeURIComponent(e[n])
            }, "") : ""
        }
        function s() {
            return "undefined" != typeof document && "undefined" != typeof document.webkitHidden ? {
                hidden: "webkitHidden",
                visibilityChange: "webkitvisibilitychange"
            } : {
                hidden: "hidden",
                visibilityChange: "visibilitychange"
            }
        }
        function a(e, t) {
            return l.indexOf(o.parse(e).hostname) >= 0 ? t : e
        }
        function h() {
            return a(document.referrer, (o.parse(document.location.href, !0).query || {}).referer || "")
        }
        function u(e) {
            return e ? function(e) {
                return e.replace(/^http:/, "https:")
            }
            : function(e) {
                return e
            }
        }
        function c(e, t) {
            return t ? e.replace(p, f) : e
        }
        e.formatSeconds = t,
        e.trackMouseSeek = n,
        e.objectToQuery = r,
        e.getPrefixedVisibilityApi = s;
        var l = [o.parse(i.config.servers.thumbWatch).hostname, o.parse(i.config.servers.extplayervDomain).hostname];
        e.getOrgReferer = a,
        e.getOrgRefererOnClient = h,
        e.createProtocolAdjuster = u;
        var p = /http:\/\/tn(-skr[1-4]?)?\.smilevideo\.jp\//
          , f = "https://tn.smilevideo.jp/";
        e.convertVideoThumbnailUrl = c
    }(r || (r = {})),
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = r
}
, function(e, t, n) {
    function r() {
        this.protocol = null,
        this.slashes = null,
        this.auth = null,
        this.host = null,
        this.port = null,
        this.hostname = null,
        this.hash = null,
        this.search = null,
        this.query = null,
        this.pathname = null,
        this.path = null,
        this.href = null
    }
    function o(e, t, n) {
        if (e && u(e) && e instanceof r)
            return e;
        var o = new r;
        return o.parse(e, t, n),
        o
    }
    function i(e) {
        return h(e) && (e = o(e)),
        e instanceof r ? e.format() : r.prototype.format.call(e)
    }
    function s(e, t) {
        return o(e, !1, !0).resolve(t)
    }
    function a(e, t) {
        return e ? o(e, !1, !0).resolveObject(t) : t
    }
    function h(e) {
        return "string" == typeof e
    }
    function u(e) {
        return "object" == typeof e && null !== e
    }
    function c(e) {
        return null === e
    }
    function l(e) {
        return null == e
    }
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    var p = n(10);
    t.parse = o,
    t.resolve = s,
    t.resolveObject = a,
    t.format = i,
    t.Url = r;
    var f = /^([a-z0-9.+-]+:)/i
      , m = /:[0-9]*$/
      , v = ["<", ">", '"', "`", " ", "\r", "\n", "\t"]
      , d = ["{", "}", "|", "\\", "^", "`"].concat(v)
      , y = ["'"].concat(d)
      , g = ["%", "/", "?", ";", "#"].concat(y)
      , w = ["/", "?", "#"]
      , _ = 255
      , b = /^[a-z0-9A-Z_-]{0,63}$/
      , E = /^([a-z0-9A-Z_-]{0,63})(.*)$/
      , C = {
        javascript: !0,
        "javascript:": !0
    }
      , P = {
        javascript: !0,
        "javascript:": !0
    }
      , j = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }
      , x = n(12);
    r.prototype.parse = function(e, t, n) {
        if (!h(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var r = e;
        r = r.trim();
        var o = f.exec(r);
        if (o) {
            o = o[0];
            var i = o.toLowerCase();
            this.protocol = i,
            r = r.substr(o.length)
        }
        if (n || o || r.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var s = "//" === r.substr(0, 2);
            !s || o && P[o] || (r = r.substr(2),
            this.slashes = !0)
        }
        if (!P[o] && (s || o && !j[o])) {
            for (var a = -1, u = 0; u < w.length; u++) {
                var c = r.indexOf(w[u]);
                c !== -1 && (a === -1 || c < a) && (a = c)
            }
            var l, m;
            m = a === -1 ? r.lastIndexOf("@") : r.lastIndexOf("@", a),
            m !== -1 && (l = r.slice(0, m),
            r = r.slice(m + 1),
            this.auth = decodeURIComponent(l)),
            a = -1;
            for (var u = 0; u < g.length; u++) {
                var c = r.indexOf(g[u]);
                c !== -1 && (a === -1 || c < a) && (a = c)
            }
            a === -1 && (a = r.length),
            this.host = r.slice(0, a),
            r = r.slice(a),
            this.parseHost(),
            this.hostname = this.hostname || "";
            var v = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!v)
                for (var d = this.hostname.split(/\./), u = 0, k = d.length; u < k; u++) {
                    var I = d[u];
                    if (I && !I.match(b)) {
                        for (var L = "", O = 0, A = I.length; O < A; O++)
                            L += I.charCodeAt(O) > 127 ? "x" : I[O];
                        if (!L.match(b)) {
                            var T = d.slice(0, u)
                              , S = d.slice(u + 1)
                              , F = I.match(E);
                            F && (T.push(F[1]),
                            S.unshift(F[2])),
                            S.length && (r = "/" + S.join(".") + r),
                            this.hostname = T.join(".");
                            break
                        }
                    }
                }
            if (this.hostname.length > _ ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
            !v) {
                for (var M = this.hostname.split("."), R = [], u = 0; u < M.length; ++u) {
                    var q = M[u];
                    R.push(q.match(/[^A-Za-z0-9_-]/) ? "xn--" + p.encode(q) : q)
                }
                this.hostname = R.join(".")
            }
            var U = this.port ? ":" + this.port : ""
              , D = this.hostname || "";
            this.host = D + U,
            this.href += this.host,
            v && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
            "/" !== r[0] && (r = "/" + r))
        }
        if (!C[i])
            for (var u = 0, k = y.length; u < k; u++) {
                var N = y[u]
                  , B = encodeURIComponent(N);
                B === N && (B = escape(N)),
                r = r.split(N).join(B)
            }
        var H = r.indexOf("#");
        H !== -1 && (this.hash = r.substr(H),
        r = r.slice(0, H));
        var z = r.indexOf("?");
        if (z !== -1 ? (this.search = r.substr(z),
        this.query = r.substr(z + 1),
        t && (this.query = x.parse(this.query)),
        r = r.slice(0, z)) : t && (this.search = "",
        this.query = {}),
        r && (this.pathname = r),
        j[i] && this.hostname && !this.pathname && (this.pathname = "/"),
        this.pathname || this.search) {
            var U = this.pathname || ""
              , q = this.search || "";
            this.path = U + q
        }
        return this.href = this.format(),
        this
    }
    ,
    r.prototype.format = function() {
        var e = this.auth || "";
        e && (e = encodeURIComponent(e),
        e = e.replace(/%3A/i, ":"),
        e += "@");
        var t = this.protocol || ""
          , n = this.pathname || ""
          , r = this.hash || ""
          , o = !1
          , i = "";
        this.host ? o = e + this.host : this.hostname && (o = e + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"),
        this.port && (o += ":" + this.port)),
        this.query && u(this.query) && Object.keys(this.query).length && (i = x.stringify(this.query));
        var s = this.search || i && "?" + i || "";
        return t && ":" !== t.substr(-1) && (t += ":"),
        this.slashes || (!t || j[t]) && o !== !1 ? (o = "//" + (o || ""),
        n && "/" !== n.charAt(0) && (n = "/" + n)) : o || (o = ""),
        r && "#" !== r.charAt(0) && (r = "#" + r),
        s && "?" !== s.charAt(0) && (s = "?" + s),
        n = n.replace(/[?#]/g, function(e) {
            return encodeURIComponent(e)
        }),
        s = s.replace("#", "%23"),
        t + o + n + s + r
    }
    ,
    r.prototype.resolve = function(e) {
        return this.resolveObject(o(e, !1, !0)).format()
    }
    ,
    r.prototype.resolveObject = function(e) {
        if (h(e)) {
            var t = new r;
            t.parse(e, !1, !0),
            e = t
        }
        var n = new r;
        if (Object.keys(this).forEach(function(e) {
            n[e] = this[e]
        }, this),
        n.hash = e.hash,
        "" === e.href)
            return n.href = n.format(),
            n;
        if (e.slashes && !e.protocol)
            return Object.keys(e).forEach(function(t) {
                "protocol" !== t && (n[t] = e[t])
            }),
            j[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
            n.href = n.format(),
            n;
        if (e.protocol && e.protocol !== n.protocol) {
            if (!j[e.protocol])
                return Object.keys(e).forEach(function(t) {
                    n[t] = e[t]
                }),
                n.href = n.format(),
                n;
            if (n.protocol = e.protocol,
            e.host || P[e.protocol])
                n.pathname = e.pathname;
            else {
                for (var o = (e.pathname || "").split("/"); o.length && !(e.host = o.shift()); )
                    ;
                e.host || (e.host = ""),
                e.hostname || (e.hostname = ""),
                "" !== o[0] && o.unshift(""),
                o.length < 2 && o.unshift(""),
                n.pathname = o.join("/")
            }
            if (n.search = e.search,
            n.query = e.query,
            n.host = e.host || "",
            n.auth = e.auth,
            n.hostname = e.hostname || e.host,
            n.port = e.port,
            n.pathname || n.search) {
                var i = n.pathname || ""
                  , s = n.search || "";
                n.path = i + s
            }
            return n.slashes = n.slashes || e.slashes,
            n.href = n.format(),
            n
        }
        var a = n.pathname && "/" === n.pathname.charAt(0)
          , u = e.host || e.pathname && "/" === e.pathname.charAt(0)
          , p = u || a || n.host && e.pathname
          , f = p
          , m = n.pathname && n.pathname.split("/") || []
          , o = e.pathname && e.pathname.split("/") || []
          , v = n.protocol && !j[n.protocol];
        if (v && (n.hostname = "",
        n.port = null,
        n.host && ("" === m[0] ? m[0] = n.host : m.unshift(n.host)),
        n.host = "",
        e.protocol && (e.hostname = null,
        e.port = null,
        e.host && ("" === o[0] ? o[0] = e.host : o.unshift(e.host)),
        e.host = null),
        p = p && ("" === o[0] || "" === m[0])),
        u)
            n.host = e.host || "" === e.host ? e.host : n.host,
            n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
            n.search = e.search,
            n.query = e.query,
            m = o;
        else if (o.length)
            m || (m = []),
            m.pop(),
            m = m.concat(o),
            n.search = e.search,
            n.query = e.query;
        else if (!l(e.search)) {
            if (v) {
                n.hostname = n.host = m.shift();
                var d = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
                d && (n.auth = d.shift(),
                n.host = n.hostname = d.shift())
            }
            return n.search = e.search,
            n.query = e.query,
            c(n.pathname) && c(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            n.href = n.format(),
            n
        }
        if (!m.length)
            return n.pathname = null,
            n.search ? n.path = "/" + n.search : n.path = null,
            n.href = n.format(),
            n;
        for (var y = m.slice(-1)[0], g = (n.host || e.host) && ("." === y || ".." === y) || "" === y, w = 0, _ = m.length; _ >= 0; _--)
            y = m[_],
            "." == y ? m.splice(_, 1) : ".." === y ? (m.splice(_, 1),
            w++) : w && (m.splice(_, 1),
            w--);
        if (!p && !f)
            for (; w--; w)
                m.unshift("..");
        !p || "" === m[0] || m[0] && "/" === m[0].charAt(0) || m.unshift(""),
        g && "/" !== m.join("/").substr(-1) && m.push("");
        var b = "" === m[0] || m[0] && "/" === m[0].charAt(0);
        if (v) {
            n.hostname = n.host = b ? "" : m.length ? m.shift() : "";
            var d = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
            d && (n.auth = d.shift(),
            n.host = n.hostname = d.shift())
        }
        return p = p || n.host && m.length,
        p && !b && m.unshift(""),
        m.length ? n.pathname = m.join("/") : (n.pathname = null,
        n.path = null),
        c(n.pathname) && c(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
        n.auth = e.auth || n.auth,
        n.slashes = n.slashes || e.slashes,
        n.href = n.format(),
        n
    }
    ,
    r.prototype.parseHost = function() {
        var e = this.host
          , t = m.exec(e);
        t && (t = t[0],
        ":" !== t && (this.port = t.substr(1)),
        e = e.substr(0, e.length - t.length)),
        e && (this.hostname = e)
    }
}
, function(e, t, n) {
    var r;
    (function(e, o) {
        !function(i) {
            function s(e) {
                throw RangeError(T[e])
            }
            function a(e, t) {
                for (var n = e.length, r = []; n--; )
                    r[n] = t(e[n]);
                return r
            }
            function h(e, t) {
                var n = e.split("@")
                  , r = "";
                n.length > 1 && (r = n[0] + "@",
                e = n[1]),
                e = e.replace(A, ".");
                var o = e.split(".")
                  , i = a(o, t).join(".");
                return r + i
            }
            function u(e) {
                for (var t, n, r = [], o = 0, i = e.length; o < i; )
                    t = e.charCodeAt(o++),
                    t >= 55296 && t <= 56319 && o < i ? (n = e.charCodeAt(o++),
                    56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                    o--)) : r.push(t);
                return r
            }
            function c(e) {
                return a(e, function(e) {
                    var t = "";
                    return e > 65535 && (e -= 65536,
                    t += M(e >>> 10 & 1023 | 55296),
                    e = 56320 | 1023 & e),
                    t += M(e)
                }).join("")
            }
            function l(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : b
            }
            function p(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
            }
            function f(e, t, n) {
                var r = 0;
                for (e = n ? F(e / j) : e >> 1,
                e += F(e / t); e > S * C >> 1; r += b)
                    e = F(e / S);
                return F(r + (S + 1) * e / (e + P))
            }
            function m(e) {
                var t, n, r, o, i, a, h, u, p, m, v = [], d = e.length, y = 0, g = k, w = x;
                for (n = e.lastIndexOf(I),
                n < 0 && (n = 0),
                r = 0; r < n; ++r)
                    e.charCodeAt(r) >= 128 && s("not-basic"),
                    v.push(e.charCodeAt(r));
                for (o = n > 0 ? n + 1 : 0; o < d; ) {
                    for (i = y,
                    a = 1,
                    h = b; o >= d && s("invalid-input"),
                    u = l(e.charCodeAt(o++)),
                    (u >= b || u > F((_ - y) / a)) && s("overflow"),
                    y += u * a,
                    p = h <= w ? E : h >= w + C ? C : h - w,
                    !(u < p); h += b)
                        m = b - p,
                        a > F(_ / m) && s("overflow"),
                        a *= m;
                    t = v.length + 1,
                    w = f(y - i, t, 0 == i),
                    F(y / t) > _ - g && s("overflow"),
                    g += F(y / t),
                    y %= t,
                    v.splice(y++, 0, g)
                }
                return c(v)
            }
            function v(e) {
                var t, n, r, o, i, a, h, c, l, m, v, d, y, g, w, P = [];
                for (e = u(e),
                d = e.length,
                t = k,
                n = 0,
                i = x,
                a = 0; a < d; ++a)
                    v = e[a],
                    v < 128 && P.push(M(v));
                for (r = o = P.length,
                o && P.push(I); r < d; ) {
                    for (h = _,
                    a = 0; a < d; ++a)
                        v = e[a],
                        v >= t && v < h && (h = v);
                    for (y = r + 1,
                    h - t > F((_ - n) / y) && s("overflow"),
                    n += (h - t) * y,
                    t = h,
                    a = 0; a < d; ++a)
                        if (v = e[a],
                        v < t && ++n > _ && s("overflow"),
                        v == t) {
                            for (c = n,
                            l = b; m = l <= i ? E : l >= i + C ? C : l - i,
                            !(c < m); l += b)
                                w = c - m,
                                g = b - m,
                                P.push(M(p(m + w % g, 0))),
                                c = F(w / g);
                            P.push(M(p(c, 0))),
                            i = f(n, y, r == o),
                            n = 0,
                            ++r
                        }
                    ++n,
                    ++t
                }
                return P.join("")
            }
            function d(e) {
                return h(e, function(e) {
                    return L.test(e) ? m(e.slice(4).toLowerCase()) : e
                })
            }
            function y(e) {
                return h(e, function(e) {
                    return O.test(e) ? "xn--" + v(e) : e
                })
            }
            var g = ("object" == typeof t && t && !t.nodeType && t,
            "object" == typeof e && e && !e.nodeType && e,
            "object" == typeof o && o);
            g.global !== g && g.window !== g && g.self !== g || (i = g);
            var w, _ = 2147483647, b = 36, E = 1, C = 26, P = 38, j = 700, x = 72, k = 128, I = "-", L = /^xn--/, O = /[^\x20-\x7E]/, A = /[\x2E\u3002\uFF0E\uFF61]/g, T = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, S = b - E, F = Math.floor, M = String.fromCharCode;
            w = {
                version: "1.3.2",
                ucs2: {
                    decode: u,
                    encode: c
                },
                decode: m,
                encode: v,
                toASCII: y,
                toUnicode: d
            },
            r = function() {
                return w
            }
            .call(t, n, t, e),
            !(void 0 !== r && (e.exports = r))
        }(this)
    }
    ).call(t, n(11)(e), function() {
        return this
    }())
}
, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}
        ,
        e.paths = [],
        e.children = [],
        e.webpackPolyfill = 1),
        e
    }
}
, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(13),
    t.encode = t.stringify = n(14)
}
, function(e, t) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    "use strict";
    function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, r, o) {
        t = t || "&",
        r = r || "=";
        var i = {};
        if ("string" != typeof e || 0 === e.length)
            return i;
        var s = /\+/g;
        e = e.split(t);
        var a = 1e3;
        o && "number" == typeof o.maxKeys && (a = o.maxKeys);
        var h = e.length;
        a > 0 && h > a && (h = a);
        for (var u = 0; u < h; ++u) {
            var c, l, p, f, m = e[u].replace(s, "%20"), v = m.indexOf(r);
            v >= 0 ? (c = m.substr(0, v),
            l = m.substr(v + 1)) : (c = m,
            l = ""),
            p = decodeURIComponent(c),
            f = decodeURIComponent(l),
            n(i, p) ? Array.isArray(i[p]) ? i[p].push(f) : i[p] = [i[p], f] : i[p] = f
        }
        return i
    }
}
, function(e, t) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    "use strict";
    var n = function(e) {
        switch (typeof e) {
        case "string":
            return e;
        case "boolean":
            return e ? "true" : "false";
        case "number":
            return isFinite(e) ? e : "";
        default:
            return ""
        }
    };
    e.exports = function(e, t, r, o) {
        return t = t || "&",
        r = r || "=",
        null === e && (e = void 0),
        "object" == typeof e ? Object.keys(e).map(function(o) {
            var i = encodeURIComponent(n(o)) + r;
            return Array.isArray(e[o]) ? e[o].map(function(e) {
                return i + encodeURIComponent(n(e))
            }).join(t) : i + encodeURIComponent(n(e[o]))
        }).join(t) : o ? encodeURIComponent(n(o)) + r + encodeURIComponent(n(e)) : ""
    }
}
]);
