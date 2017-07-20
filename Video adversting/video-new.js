// Replacement video
$(function() {

  var videoFrame = $("iframe[src^='https://www.youtube.com'], iframe[src^='//vk.com']");
	var referer = window.location.toString();

  // Black block before video
        for (i = 0; i < videoFrame.length; i++) {
            var trueWidth = videoFrame[i].offsetWidth;
            var trueHeight = videoFrame[i].offsetHeight;
            var trueFrame = document.createElement('div');
            trueFrame.classList.add("video-plashka");
            trueFrame.style.width = trueWidth + "px";
            trueFrame.style.height = trueHeight + "px";
            trueFrame.style.cursor = 'pointer';
            trueFrame.style.position = 'absolute';
            trueFrame.style.zIndex = '1000';
            var parentVideo = videoFrame[i].parentNode;
            parentVideo.insertBefore(trueFrame, videoFrame[i]);
        }

		// Processing and video output
      $('.video-plashka').click(function() {
			    var pr = parseInt(new Date().getTime()/1000) + Math.floor(Math.random()*214748364);
			    var sessionId = parseInt(new Date().getTime()/1000) + "" + Math.floor(Math.random()*2147483647);
			    var eid1 = 10514 + ":" + sessionId + ":" + pr;
          var thisSibling = this.nextSibling;
          var parentVideo = this.parentNode;
          var pathVideo = this.nextSibling.getAttribute('src');
			    var cookie = localStorage.getItem('lpdid');
          this.style.display = "none";

			    if (cookie == null) {
				     $.ajax({
				        type: "GET",
				        url: "http://ads.adfox.ru/226279/getid?pr=13123&t=json",
				        async:false,
				        success: function(data) {
                    cookie = data.lpd_id;
                    localStorage.setItem("lpdid", cookie);
				        }
			      });
		    	}
      // Main request
			$.ajax({
				type: "GET",
				url: "http://v.adfox.ru/226279/getCode?pp=eez&ps=cfxd&p2=eyit&pfc=a&pfb=a&plp=a&pli=a&pop=a&pct=d&puid5=1&puid6=1&puid30=10514&pr=" + pr + "&lpdid=" + cookie + "&eid1=" + eid1 + "&dl=http://360tv/default/" + ":" + referer,
				dataType: "xml",
				success: function(data){
					console.log("Response is ready!");
					// Parsing XML
					var videoStroka;
					var videoLink;
					var impression = data.firstChild.childNodes[1].childNodes[1].childNodes[7].textContent;
					var videoStart;
					var videoWidth;
					var videoHeight;
					var videoFirstQuartile;
					var videoMidPoint;
					var videoThirdPoint;
					var videoComplete;
					var videoClose;
					var videoCloseButton;
					var videoMute;
					var videoUnmute;
					var videoPause;
					var videoNotPause;
					var videoMediaFiles;

					// Check for content
					var emptyId = data.firstChild.childNodes[1];
					var emptyIdAttr = emptyId.getAttribute('id');

				  if (emptyIdAttr !== 'empty') 	{
              var videoList = data.firstChild.childNodes[1].childNodes[1].childNodes;
					    for (i=0; i < videoList.length; i++) {
						    var videoListNext = videoList[i].childNodes[1];
						    if (videoListNext != undefined) {
							      if (videoListNext.nodeName == 'Creative') {
								    var videoLinear = videoListNext.childNodes[1].childNodes;
								    for (k=0; k < videoLinear.length; k++) {
									      if (videoLinear[k].nodeName == 'MediaFiles') {
                          videoMediaFiles = 1;
										      videoStroka = videoLinear[k].childNodes[1].textContent;
										      var videoStrokaAttr = videoLinear[k].childNodes[1].attributes;
										      videoWidth = videoStrokaAttr.getNamedItem('width').textContent;
										      videoHeight = videoStrokaAttr.getNamedItem('height').textContent;
									      }
									      if (videoLinear[k].nodeName == 'VideoClicks') {
										      videoLink = videoLinear[k].childNodes[1].textContent;
									      }
									      if (videoLinear[k].nodeName == 'TrackingEvents') {
										      videoTracking = videoLinear[k].childNodes;
										      for (l=0; l < videoTracking.length; l++) {
											      var videoTrackingString = videoTracking[l].attributes;
											      if (videoTrackingString != undefined && videoTrackingString != null) {
											      // Video checked- <creativeView>
											      if (videoTrackingString.getNamedItem('event').textContent == "creativeView") {
											        $.ajax({
												        type: "GET",
												        url: videoTracking[l].textContent,
												        success: function() {
												        console.log("CreativeView is ready!");
												        }
											        });
											      }
										          // The beginning of the show
										          if (videoTrackingString.getNamedItem('event').textContent == "start") {
											          videoStart = videoTracking[l].textContent;
										          }
										          // First quarter
										          if (videoTrackingString.getNamedItem('event').textContent == "firstQuartile") {
											          videoFirstQuartile = videoTracking[l].textContent;
										          }
										          // Middle
										          if (videoTrackingString.getNamedItem('event').textContent == "midpoint") {
											          videoMidPoint = videoTracking[l].textContent;
										          }
										          // Third quarter
										          if (videoTrackingString.getNamedItem('event').textContent == "thirdQuartile") {
											          videoThirdPoint = videoTracking[l].textContent;
										          }
										          // End of video
										          if (videoTrackingString.getNamedItem('event').textContent == "complete") {
											          videoComplete = videoTracking[l].textContent;
										          }
										          // Click the 'close' button
										          if (videoTrackingString.getNamedItem('event').textContent == "close") {
											          videoCloseButton = videoTracking[l].textContent;
										          }
										          // Volume off
										          if (videoTrackingString.getNamedItem('event').textContent == "mute") {
											          videoMute = videoTracking[l].textContent;
										          }
										          // Volume on
										          if (videoTrackingString.getNamedItem('event').textContent == "unmute") {
											          videoUnmute = videoTracking[l].textContent;
										          }
										          // Pause
										          if (videoTrackingString.getNamedItem('event').textContent == "pause") {
											          videoPause = videoTracking[l].textContent;
										          }
										          // Resume video
										          if (videoTrackingString.getNamedItem('event').textContent == "resume") {
											          videoNotPause = videoTracking[l].textContent;
										          }
									            }

								            }
							            }
							        	}
							      }
                }
					    }

					// Check for MediaFiles
					if (videoMediaFiles != undefined) {
							// Close + onVastLoad
					thisSibling.style.visibility="hidden";
					var videoCloseKrestik = data.firstChild.childNodes[1].childNodes[1].childNodes;
					for (i=0; i < videoCloseKrestik.length; i++) {
						if (videoCloseKrestik[i].nodeName == 'Extensions') {
							var videoCloseKrestikCollection = videoCloseKrestik[i].childNodes;
							for (k=0; k < videoCloseKrestikCollection.length; k++) {
								var videoCloseKrestikAttribute = videoCloseKrestikCollection[k].attributes;
								if (videoCloseKrestikAttribute != undefined && videoCloseKrestikAttribute != null) {
									if (videoCloseKrestikAttribute.getNamedItem('type').textContent == "skipTime2") {
										videoClose = videoCloseKrestikCollection[k].textContent;
									}
									// Vast
									if (videoCloseKrestikAttribute.getNamedItem('type').textContent == "CustomTracking") {
										videoVast = videoCloseKrestikCollection[k].textContent;
										// Delete spaces
										function del_spaces(videoVast)
										{
											videoVastNew = videoVast.replace(/\s/g, '');
											return videoVastNew;
										}
										del_spaces(videoVast);
										videoVastNewArr = videoVastNew.split('https');
										for (j=0; j < videoVastNewArr.length; j++) {
												if (videoVastNewArr[j] !== "") {
													videoVastLink = "https" + videoVastNewArr[j];
													$.ajax({
														type: "GET",
														url: videoVastLink,
														success: function() {
															console.log("OnVastLoad");
														}
													});
												}
										}
									}
								}
							}
						}
					}

					var krestik = document.createElement('div');
					var krestikMarginRight = trueWidth - videoWidth;
					krestik.classList.add("video-krestik");
					krestik.style.width = "50px";
					krestik.style.height = "50px";
					krestik.style.marginTop = "20px";
					krestik.style.right = krestikMarginRight + 10 + "px";
					krestik.style.color = "white";
					krestik.style.fontSize = "24px";
					krestik.style.fontWeight = "bold";
					krestik.style.position = 'absolute';
					krestik.style.zIndex = '1500';
					krestik.style.cursor = 'pointer';
					krestik.style.display = "none";
					krestik.innerText = "X";
					parentVideo.insertBefore(krestik, thisSibling);

					var videoCloseArr = videoClose.split(':');
					var videoCloseResult = (videoCloseArr[0] * 60) + (videoCloseArr[1] * 1);
					// Call <Impression>
					$.ajax({
						type: "GET",
						url: impression,
						success: function(){
							console.log("Impression is ready!");
						}
					});

					// On and Off volume
					var mute = document.createElement('div');
					var playMuteHeight  = trueHeight - videoHeight;
					mute.classList.add("video-mute");
					mute.style.width = "30px";
					mute.style.height = "30px";
					mute.style.bottom = playMuteHeight + 20 +"px";
					mute.style.left = "20px";
					mute.style.position = 'absolute';
					mute.style.zIndex = '1500';
					mute.style.cursor = 'pointer';
					mute.style.display = "none";
					mute.innerHTML = "<img src='https://image.flaticon.com/icons/png/512/12/12351.png'width='30'/>";
					parentVideo.insertBefore(mute, thisSibling);

					// Play button
					var play = document.createElement('div');
					play.classList.add("video-play");
					play.style.width = "30px";
					play.style.height = "30px";
					play.style.bottom = playMuteHeight + 20 +"px";
					play.style.left = "60px";
					play.style.position = 'absolute';
					play.style.zIndex = '1500';
					play.style.cursor = 'pointer';
					play.style.display = "none";
					play.innerHTML = "<img src='https://maxcdn.icons8.com/Android_L/PNG/512/Logos/google_play-512.png' width='30'/>";
					parentVideo.insertBefore(play, thisSibling);
					var videoStrokaNew = videoStroka.substr(0, videoStroka.length - 6);
					var videoAdversting = document.createElement('video');
					var videoChild = document.createElement('source');
					videoChild.setAttribute('src', videoStrokaNew + '.mp4');
					videoChild.setAttribute('type','video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
					videoAdversting.appendChild(videoChild);
					var videoChild1 = document.createElement('source');
					videoChild1.setAttribute('src', videoStrokaNew + '.webm');
					videoChild1.setAttribute('type','video/webm; codecs="vp8, vorbis"');
					videoAdversting.appendChild(videoChild1);
					var videoChild2 = document.createElement('source');
					videoChild2.setAttribute('src', videoStrokaNew + '.ogv');
					videoChild2.setAttribute('type','video/ogg; codecs="theora, vorbis"');
					videoAdversting.appendChild(videoChild2);
					var videoChild3 = document.createElement('source');
					videoChild3.setAttribute('src', videoStrokaNew + '.mp4');
					videoChild3.setAttribute('type', 'video/mp4; codecs="theora, vorbis" ');
					videoAdversting.appendChild(videoChild3);
					videoAdversting.style.width = videoWidth + "px";
					videoAdversting.style.height = videoHeight + "px";
					videoAdversting.style.position = 'absolute';
					videoAdversting.style.zIndex = '1000';
					parentVideo.insertBefore(videoAdversting, thisSibling);
					videoAdversting.play();

					// Redirect
					videoAdversting.addEventListener('click', function() {
						if (videoLink !== "") {
							window.open(videoLink);
						}
					});

					// Volume options
					mute.addEventListener('click', function() {
						if (videoAdversting.muted) {
							videoAdversting.muted = false;
							$.ajax({
									type: "GET",
									url: videoUnmute,
									success: function(){
										console.log("Mute on!");
									}
								});
							}
							else {
								videoAdversting.muted = true;
								$.ajax({
									type: "GET",
									url: videoMute,
									success: function(){
										console.log("Mute off!");
									}
								});
						}
					});

					// play/pause button options
					play.addEventListener('click', function() {
						if (videoAdversting.paused) {
							videoAdversting.play();
							$.ajax({
									type: "GET",
									url: videoNotPause,
									success: function(){
										console.log("Pause off!");
									}
								});
							}
							else {
								videoAdversting.pause();
								$.ajax({
									type: "GET",
									url: videoPause,
									success: function(){
										console.log("Pause on!");
									}
								});
						}
					});

					// Parser
					var parserChildren = parentVideo.children;
					var parserChildrenKrestik = "";
					//var parserChildrenPropusk = "";
					var parserChildrenKrestik = parserChildren[1];
					var parserChildrenVideo = parserChildren[4];
					//var parserChildrenPropusk = parserChildren[5];
					var parserChildrenFrame = parserChildren[5];

					// Get video length
					var vLength = "";
					videoAdversting.addEventListener("loadedmetadata", function () {
						vLength = this.duration.toFixed();
					}, false);

					// Current position
					videoAdversting.addEventListener("timeupdate", function () {
						var videoAdverstingNew = this;
						var vTime = this.currentTime.toFixed();
					    // Start
						if(vTime == 1) {
							mute.style.display = "block";
							play.style.display = "block";
							$.ajax({
							type: "GET",
							url: videoStart,
							success: function(){
								videoStart = "http://yandex.ru";
							}
						});
					}
						  // First quarter
						if (vTime == Math.floor(vLength / 4)) {
							$.ajax({
								type: "GET",
								url: videoFirstQuartile,
								success: function(){
									videoFirstQuartile = "http://yandex.ru";
								}
							});
						}
						// Middle
						if (vTime == vLength / 2) {
							$.ajax({
								type: "GET",
								url: videoMidPoint,
								success: function(){
									videoMidPoint = "http://yandex.ru";
								}
							});
						}
						// Third quarter
						if (vTime == Math.floor(vLength - (vLength / 4))) {
							$.ajax({
								type: "GET",
								url: videoThirdPoint,
								success: function(){
									videoThirdPoint = "http://yandex.ru";
								}
							});
						}

						// Включить крестик
						if (vLength > videoCloseResult) {
							if (vTime > videoCloseResult) {
								   krestik.style.display="block";
								   krestik.addEventListener('click', function() {
									$.ajax({
										type: "GET",
										url: videoCloseButton,
										success: function(){
											videoCloseButton = "http://yandex.ru";
										}
									});
									parserChildrenVideo.muted = true;
									parserChildrenVideo.style.display="none";
									thisSibling.style.visibility="visible";
									mute.style.display="none";
									mute.style.visibility="hidden";
									play.style.display="none";
									play.style.visibility="hidden";
									this.style.visibility="hidden";
									// Youtube video
									if (pathVideo.indexOf("youtube") !== -1) {
										var pathVideoNew = pathVideo + "&autoplay=1";
										parserChildrenFrame.setAttribute('src', pathVideoNew);
									}
									// Vk video
									if (pathVideo.indexOf("vk") !== -1) {
										var pathVideoNew = pathVideo + "&autoplay=1";
										parserChildrenFrame.setAttribute('src', pathVideoNew);
									}
								});
							}
						}

						// Start to showing video after adversting
						if (vTime == vLength) {
							videoAdversting.style.display="none";
							thisSibling.style.visibility="visible";
							krestik.style.display="none";
							krestik.style.visibility="hidden";
							mute.style.display="none";
							mute.style.visibility="hidden";
							play.style.display="none";
							play.style.visibility="hidden";
							// End of video
							$.ajax({
								type: "GET",
								url: videoComplete,
								success: function(){
									videoComplete = "http://yandex.ru";
								}
							});
							// Youtube video
							if (pathVideo.indexOf("youtube") !== -1) {
								var pathVideoNew = pathVideo + "&autoplay=1";
							    parserChildrenFrame.setAttribute('src', pathVideoNew);
							}
							// Vk video
							if (pathVideo.indexOf("vk") !== -1) {
								var pathVideoNew = pathVideo + "&autoplay=1";
							    parserChildrenFrame.setAttribute('src', pathVideoNew);
							}
						}
					}, false);
				}
				else {
					// Youtube video
					if (pathVideo.indexOf("youtube") !== -1) {
						var pathVideoNew = pathVideo + "&autoplay=1";
						thisSibling.setAttribute('src', pathVideoNew);
					}
					// Vk video
					if (pathVideo.indexOf("vk") !== -1) {
						var pathVideoNew = pathVideo + "&autoplay=1";
						thisSibling.setAttribute('src', pathVideoNew);
					}
				}
					}

				else {
				// If empty content
					console.log('Empty');
					var emptyVast = data.firstChild.childNodes[1].childNodes[1].childNodes;
					for (i=0; i < emptyVast.length; i++) {
						if (emptyVast[i].nodeName == 'Extensions') {
							var emptyVastChild = emptyVast[i].childNodes;
							for (j=0; j < emptyVastChild.length; j++) {
							  var emptyVastNode = emptyVastChild[j].childNodes;
							  for (k=0; k < emptyVastNode.length; k++) {
								  var emptyVastContent = emptyVastNode[k].textContent;
								  if (emptyVastContent !== "") {
								    $.ajax({
								    type: "GET",
								    url: emptyVastContent,
								    success: function(){
									    console.log("Empty response onVastLoad");
								    }
							      });
							    }
							  }
						  }
						}
					}
					// Youtube video
					if (pathVideo.indexOf("youtube") !== -1) {
						var pathVideoNew = pathVideo + "&autoplay=1";
						thisSibling.setAttribute('src', pathVideoNew);
					}
					// Vk video
					if (pathVideo.indexOf("vk") !== -1) {
						var pathVideoNew = pathVideo + "&autoplay=1";
						thisSibling.setAttribute('src', pathVideoNew);
					}
				}
				}
      });
		});
	});
