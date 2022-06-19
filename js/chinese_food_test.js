var chineseFoodTest = new Vue({
    el: '#chinese-food-test',
    data: {
        intro: '시작하기',
        story: [],
        title: '중국 음식 테스트 (소름주의)',
        qna: [],
        storyIndex: -1,
        currentIndex: 0,
        beforeResult: '',
        result: '',
        message: '',
        msgTimer: 0,
        storyTimer: 0,
        bgmSource: null,
        bgmPlaying: false,
        nextStoryFlag: false,
        startFlag: true
    },
    beforeMount: function() {
        this.story.push('비가 유난히도\n\n거세게 내리는 저녁');
        this.story.push('비를 피해 중국집에\n\n들어왔습니다');
        this.story.push('무거운 몸을 이끌고\n\n앉아 있는 당신');

        this.insertQna('어떤 음식을 고르시겠습니까?',['자장면','볶음밥','탕수육','짬뽕','깐풍기','간자장']);
    },
    mounted: function() {
        var self = this;
        $('#chinese-food-test').show();
        $('#intro').show();
        $('.intro-btn').show();
        $('.intro-story').hide();
        $('#main').hide();
        $('#result').hide();
        $('.before-result').hide();
        $('.result').hide();
        $('#turn-back').hide();
        $('#lecture-link').hide();
        $('#toast').hide();

        $(".intro-btn").on('click touchstart', function() {
            setTimeout(function() {
                self.playSound();
            }, 200);
        });
    },
    methods: {
        showResult: function() {
            var self = this;
            var speed = 2000;
            self.makeBeboreResult();
            $('#main').fadeOut(speed, function(){
                $('.before-result').show();
                $('#result').fadeIn(speed, function() {
                    setTimeout(function() {
                        $('#result').fadeOut(speed, function() {
                            self.makeResult();
                            $('.before-result').hide();
                            $('.result').show();
                            $('#turn-back').fadeIn(speed);
                            $('#result').fadeIn(speed);
                            $('#lecture-link').fadeIn(speed);
                        });
                    }, 1000);
                });
            });
        },
        makeBeboreResult: function() {
            var selNum = this.qna[0].r;
            if(selNum == 0) {
                this.beforeResult = '자장면을 선택한 당신은\n\nA타입!';
            } else if(selNum == 1) {
                this.beforeResult = '볶음밥을 선택한 당신은\n\nB타입!';
            } else if(selNum == 2) {
                this.beforeResult = '탕수육을 선택한 당신은\n\nC타입!';
            } else if(selNum == 3) {
                this.beforeResult = '짬뽕을 선택한 당신은\n\nD타입!';
            } else if(selNum == 4) {
                this.beforeResult = '깐풍기를 선택한 당신은\n\nE타입!';
            } else if(selNum == 5) {
                this.beforeResult = '간자장을 선택한 당신은\n\nF타입!';
            }

            this.beforeResult += '\n\n\n심리는 보통 무의식 속에서\n';
            this.beforeResult += '순간적인 선택이나 행위에 의해\n';
            this.beforeResult += '인간의 보편적인 행동이나\n';
            this.beforeResult += '마음가짐이 드러나는 것입니다';
        },
        makeResult: function() {
            var selNum = this.qna[0].r;
            if(selNum == 0) {
                this.result = '[A타입]\n\n자장면을 좋아하는 타입입니다';
            } else if(selNum == 1) {
                this.result = '[B타입]\n\n볶음밥을 좋아하는 타입입니다';
            } else if(selNum == 2) {
                this.result = '[C타입]\n\n탕수육을 좋아하는 타입입니다';
            } else if(selNum == 3) {
                this.result = '[D타입]\n\n짬뽕을 좋아하는 타입입니다';
            } else if(selNum == 4) {
                this.result = '[E타입]\n\n깐풍기를 좋아하는 타입입니다';
            } else if(selNum == 5) {
                this.result = '[F타입]\n\n간자장을 좋아하는 타입입니다';
            }
        },
        nextStory: function() {
            var self = this;
            var speedFade = 1000;
            if(self.storyIndex < self.story.length-1) {
                $('.intro-story').fadeIn(speedFade, function() {
                    self.storyTimer = setTimeout(function() {
                        $('.intro-story').fadeOut(speedFade, function() {
                            self.storyIndex++;
                            $('.intro-story').fadeIn(speedFade);
                            setTimeout(function() {
                                $('.thunder').fadeIn(100*(Math.floor(Math.random()*3)),function() {
                                    $(this).fadeOut(100*(Math.floor(Math.random()*3)), function() {
                                        $(this).fadeIn(100*(Math.floor(Math.random()*3)), function() {
                                            $(this).fadeOut(100*(Math.floor(Math.random()*3)));
                                        });
                                    });
                                });
                            }, 100*(Math.floor(Math.random()*8)+3));
                            var speedNext;
                            if(self.storyIndex < self.story.length-1) {
                                speedNext = 100*self.story[self.storyIndex].replace(" ","").length/1.5;
                            } else {
                                speedNext = 100*self.story[self.story.length-1].replace(" ","").length/1.5;
                            }
                            self.storyTimer = setTimeout(function() {
                                self.nextStory();
                            }, speedNext);
                        });
                    }, 200);
                });
            } else {
                $('#intro').fadeOut(speedFade, function() {
                    $('#main').fadeIn(speedFade, function() {
                        setTimeout(function() {
                            self.stopSound();
                        }, 500);
                    });
                });
            }
        },
        clickStory: function() {
            var self = this;
            var speedFade = 1000;
            if(self.nextStoryFlag) {
                if(self.storyTimer !== 0) {
                    clearTimeout(self.storyTimer);
                }
                $('.intro-story').stop();
                $('.intro-story').css('opacity','1.0');
                self.storyIndex++;
                if(self.storyIndex < self.story.length-1) {
                    self.storyTimer = setTimeout(function() {
                        self.nextStory();
                    }, 500);
                } else {
                    $('#intro').fadeOut(speedFade, function() {
                        $('#main').fadeIn(speedFade, function() {
                            setTimeout(function() {
                                self.stopSound();
                            }, 500);
                        });
                    });
                }
            }
        },
        insertQna: function(q, a) {
            var item = {
                q: q,
                a: a,
                r: ''
            };
            this.qna.push(item);
        },
        start: function() {
            var self = this;
            if(self.startFlag) {
                self.startFlag = false;
                $('#intro').fadeOut(800, function(){
                    $('.intro-btn').hide();
                    $('.intro-story').show();
                    $('#intro').fadeIn(800, function() {
                        self.nextStory();
                        setTimeout(function() {
                            self.nextStoryFlag = true;
                        }, 2000);
                    });
                });
            }
        },
        next: function () {
            if(this.currentIndex < this.qna.length-1) {
                this.currentIndex++;
            } else {
                var check = true;
                for(var i=0; i < this.qna.length; i++) {
                    if(this.qna[i].r === '') {
                        check = false;
                    }
                }
                if(check) {
                    this.showResult();
                } else {
                    this.showToast("아직 완료되지 않았습니다.");
                }
            }
        },
        prev: function () {
            if(this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.showToast('첫 질문입니다.');
            }
        },
        selectAnswer: function(qIdx, aIdx) {
            var self = this;
            this.qna[qIdx].r = aIdx;
            for(var i=0; i < this.qna[qIdx].length; i++) {
                $('#q'+qIdx).find('label').eq(i).removeClass('checked');
                $('#q'+qIdx).find('label').eq(i).addClass('unchecked');
            }
            $('#q'+qIdx).find('label').eq(aIdx).addClass('unchecked');
            $('#q'+qIdx).find('label').eq(aIdx).addClass('checked');
            setTimeout(function() {
                self.next();
            }, 300);
        },
        turnBack: function() {
            var speed = 800;
            $('#turn-back').fadeOut(speed);
            $('#lecture-link').fadeOut(speed);
            $('#result').fadeOut(speed, function(){
                setTimeout(function(){
                    location.reload();
                }, 300);
            });
        },
        showToast: function(msg) {
            var self = this;
            if(self.msgTimer !== 0) {
                clearTimeout(self.msgTimer);
                self.msgTimer = 0;
            }
            this.message = msg;
            setTimeout(function() {
                $('#toast').fadeIn(500, function() {
                    self.msgTimer = setTimeout(function() {
                        $('#toast').fadeOut(500);
                    }, 1000);
                });
            }, 200);
        },
        playSound: function() {
            var self = this;
            var path = './resources/rain.mp3';
            var context = window.audioContext;
            var request = new XMLHttpRequest();
            request.open('GET', path, true);
            request.responseType = 'arraybuffer';
            request.addEventListener('load', function (e) {
                context.decodeAudioData(this.response, function (buffer) {
                    if(!self.bgmPlaying) {
                        self.bgmPlaying = true;
                        var source = context.createBufferSource();
                        source.buffer = buffer;
                        source.connect(context.destination);
                        source.start(0);
                        self.bgmSource = source;
                    }
                });
            }, false);
            request.send();
        },
        stopSound: function() {
            this.bgmSource.stop();
        }
    }
});