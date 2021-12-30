import './index.css';

interface Props {
    ajax: {
        url: string
        articleId: string
    }

    containerClass: string
    titleClass: string
    improveClass: string
    buttonClass: string
    textareaContainer: string
    textareaClass: string

    titleUseful: string
    titleThx: string
    titleSor: string
    titleImprove: string
    titleNeedText: string
    btnUseful: string
    btnNoUseful: string
    btnSend: string
}

const DEFAULTS = {
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

export default class SAArticleSurvey {
    element: HTMLElement;
    props: Props;

    protected constructor(element: HTMLElement, props: Props) {
        this.element = element;
        this.props = Object.assign({}, DEFAULTS, props);

        if (!this.props.ajax.url)
            this.props.ajax.url = element.getAttribute('data-url');
        if (!this.props.ajax.articleId)
            this.props.ajax.articleId = element.getAttribute('data-id');

        this.handleEvents();
        this.render();
    }

    static create(element: HTMLElement, props: Props) {
        return new SAArticleSurvey(element, props);
    }

    async setRating(rating: number) {
        await fetch(this.props.ajax.url, {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.ajax.articleId,
                rating: rating
            })
        });
        if (rating === 5) {
            this.actionFinish()
        } else {
            this.actionComment()
        }
    }

    async setComment(text: string) {
        await fetch(this.props.ajax.url, {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.ajax.articleId,
                text: text
            })
        });
        this.actionFinish()
    }

    setTitle(text: string) {
        this.element.querySelector('.as-title').innerHTML = text;
    }

    actionFinish() {
        this.setTitle(this.props.titleThx);
        this.element.classList.add('submitted')
    }

    actionComment() {
        this.setTitle(this.props.titleSor);
        this.element.classList.add('rated')
    }

    protected handleEvents() {
        this.element.querySelector('.as-button').addEventListener('click', (ev) => {
            this.setRating(Number(ev.target.getAttribute('data-value')));
        });
        this.element.querySelector('.as-submit-button').addEventListener('click', (ev) => {
            const text = this.element.querySelector('textarea').value;
            if (text.trim() === '') {
                alert(this.props.titleNeedText);
            } else {
                this.setComment(text);
            }
        });
    }

    protected template() {
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
    }

    protected render() {
        this.element.innerHTML = this.template();
        this.element.classList.add(this.props.containerClass);
    }
}
