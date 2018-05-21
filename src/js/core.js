(function ($) {

    $.SAArticleSurvey = {
        defaults: {
            url: null,
            articleId: null,

            containerClass: 'card-body',
            titleClass: 'text-secondary',
            improveClass: 'text-secondary',
            buttonClass: 'btn btn-secondary',
            textareaContainer: 'form-group',
            textareaClass: 'form-control',

            titleUseful: 'Была ли эта статья полезна?',
            titleThx: 'Благодарим за отзыв.',
            titleSor: 'Приносим извинения.',
            titleImprove: 'Как можно улучшить эту статью?',
            titleNeedText: 'Укажите текст замечания',
            btnUseful: 'Да',
            btnNoUseful: 'Нет',
            btnSend: 'Отправить'
        }
    };

    if ($.fn.SAArticleSurvey == null) {
        $.fn.SAArticleSurvey = function (options) {
            options = options || {};

            if (typeof options === 'object') {
                this.each(function () {
                    //var instanceOptions = $.extend(true, {}, options);
                    var instanceOptions = $.extend($.SAArticleSurvey.defaults, {}, options);

                    new SAArticleSurvey(this, instanceOptions);
                });

                return this;
            } else {
                throw new Error('Invalid arguments for SAArticleSurvey: ' + options);
            }
        };
    }

    var SAArticleSurvey = function (element, props) {
        this.$element = $(element);
        this.props = props;

        if (!this.props.url)
            this.props.url = this.$element.attr('data-url');
        if (!this.props.articleId)
            this.props.articleId = this.$element.attr('data-id');

        this._handleEvents();
        this._render();
    };

    $.extend(SAArticleSurvey.prototype, {

        setRating: function (rating) {
            $.get(this.props.url, {id: this.props.articleId, rating: rating});
            if (rating === 5) {
                this.actionFinish()
            } else {
                this.actionComment()
            }
        },
        setComment: function (text) {
            $.get(this.props.url, {id: this.props.articleId, text: text});
            this.actionFinish()
        },
        setTitle: function (text) {
            this.$element.find('.as-title').html(text);
        },

        actionFinish: function () {
            this.setTitle(this.props.titleThx);
            this.$element.addClass('submitted')
        },

        actionComment: function () {
            this.setTitle(this.props.titleSor);
            this.$element.addClass('rated')
        },

        _handleEvents: function () {
            var instance = this;
            this.$element.on('click', '.as-button', function () {
                instance.setRating(Number($(this).attr('data-value')));
            });
            this.$element.on('click', '.as-submit-button', function () {
                var text = $(this.form).find('textarea').val();
                if (text.trim() === '') {
                    alert(instance.props.titleNeedText);
                } else {
                    instance.setComment(text);
                }
            });
        },
        _render: function () {
            this.$element.html(this.template());
            this.$element.addClass(this.props.containerClass);
        }
    });

    SAArticleSurvey.prototype.template = function () {
        return '<div class="as-title ' + this.props.titleClass + '">' + this.props.titleUseful + '</div>' +
            '<div class="as-how-improve ' + this.props.improveClass + '">' + this.props.titleImprove + '</div>' +

            '<div class="as-button-group">' +
            '<button class="as-button ' + this.props.buttonClass + '" data-value="5" type="button">' + this.props.btnUseful + '</button>' +
            ' <button class="as-button ' + this.props.buttonClass + '" data-value="1" type="button">' + this.props.btnNoUseful + '</button>' +
            '</div>' +

            '<form>' +
            '<div class="' + this.props.textareaContainer + '"><textarea aria-label="' + this.props.titleImprove + '" class="' + this.props.textareaClass + '"></textarea></div>' +
            '<button class="as-submit-button ' + this.props.buttonClass + '" type="button">' + this.props.btnSend + '</button>' +
            '</form>';
    };

    /**
     * Version information
     * @type {string}
     * @static
     */
    SAArticleSurvey.version = '1.2.0';

})
(jQuery);