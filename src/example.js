import React from 'react';
import classNames from 'classnames';
import scrollTo from 'Utils/scrollToWithFixedElement';

// Pages should look the same even when JavaScript is disabled.
// That's why any changes made in this component should be added to
// src/TheMemories/AppBundle/Resources/views/LifeStory/navigation.html.twig
class Navigation extends React.Component {
    state = {
        fixedElement: null,
        leftGradient: false,
        rightGradient: false,
        lifeStoryActive: true,
        servicesActive: false,
        contributeActive: false
    };

    componentDidMount() {
        this.checkForGradients();
        window.addEventListener('resize', this.checkForGradients);
        if (document.getElementById('services')) {
            window.addEventListener('scroll', this.onScroll);
        }
        this.navigation.addEventListener('scroll', this.checkForGradients);

        this.setState({
            fixedElement: document.querySelector('.affix__wrap')
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkForGradients);
        if (document.getElementById('services')) {
            window.removeEventListener('scroll', this.onScroll);
        }
        this.navigation.removeEventListener('scroll', this.checkForGradients);
    }

    checkForGradients = () => {
        const {scrollLeft, scrollWidth, clientWidth} = this.navigation;
        let leftGradient = false;
        let rightGradient = false;


        if (scrollLeft > 0) {
            leftGradient = true;
        }

        if (scrollLeft < scrollWidth - clientWidth) {
            rightGradient = true;
        }

        this.setState({
            leftGradient,
            rightGradient
        })
    };

    scrollToSection = (e, options = {}) => {
        e.preventDefault();
        let {target} = e;

        while (!target.classList.contains('navigation__link')) {
            target = target.parentElement;
        }

        let href = target.getAttribute('href');
        target.blur();

        if (href && href !== '#photos') {
            if (href === '#life-story') {
                scrollTo(0);
            } else {
                scrollTo(href, this.state.fixedElement, options);
            }
        }

        return false;
    };

    onClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#photos') {
            e.preventDefault();
        } else {
            this.scrollToSection(e, {offset: 1});
        }
    };

    onKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                this.scrollToSection(e, {a11y: true});
                break;

            default:
                return true;
        }
    };

    onScroll = () => {
        const {bottom} = this.state.fixedElement.getBoundingClientRect();
        const scrollPosition = window.scrollY + bottom;


        let {offsetTop: servicesTop} = document.getElementById('services');
        let {
            offsetTop: contributeTop,
            offsetHeight: contributeHeight
        } = document.getElementById('contribute');

        servicesTop -= 5;
        contributeTop -= 5;
        let contributeBottom = contributeTop + contributeHeight + 5;
        let state = {
            lifeStoryActive: false,
            servicesActive: false,
            contributeActive: false
        };

        if (scrollPosition < servicesTop) {
            state.lifeStoryActive = true;
        } else if (servicesTop <= scrollPosition && scrollPosition < contributeTop) {
            state.servicesActive = true;
        } else if (contributeTop <= scrollPosition && scrollPosition < contributeBottom) {
            state.contributeActive = true;
        }

        this.setState(state)
    };

    render () {
        const leftGradientClasses = classNames({
            'navigation__gradient': true,
            'navigation__gradient--left': true,
            'navigation__gradient--visible': this.state.leftGradient
        });

        const rightGradientClasses = classNames({
            'navigation__gradient': true,
            'navigation__gradient--right': true,
            'navigation__gradient--visible': this.state.rightGradient
        });

        const lifeStoryClassNames = classNames({
            'navigation__link': true,
            'link-selected': this.state.lifeStoryActive
        });

        const servicesClassNames = classNames({
            'navigation__link': true,
            'link-selected': this.state.servicesActive
        });

        const contributeClassNames = classNames({
            'navigation__link': true,
            'link-selected': this.state.contributeActive
        });

        const guestBookURL = location.href.split('#')[0] + '/guestbook';
        const timelineURL = location.href.split('#')[0] + '/timeline';

        return (
            <div className="navigation-wrap">
                <span className={leftGradientClasses} />
                <nav ref={nav => this.navigation = nav} className="navigation">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <a
                                href="#life-story"
                                onClick={this.onClick}
                                onKeyDown={this.onKeyDown}
                                className={lifeStoryClassNames}
                            >
                                <svg className="icon icon--pen-quill">
                                    <use xlinkHref="#icon--pen-quill" />
                                </svg>
                                <span className="navigation__text">Life Story</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a
                                href="#services"
                                onClick={this.onClick}
                                onKeyDown={this.onKeyDown}
                                className={servicesClassNames}
                            >
                                <svg className="icon icon--services">
                                    <use xlinkHref="#icon--services" />
                                </svg>
                                <span className="navigation__text">Services</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a href={timelineURL} className="navigation__link">
                                <svg className="icon icon--timeline">
                                    <use xlinkHref="#icon--timeline" />
                                </svg>
                                <span className="navigation__text">Timeline</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a href={guestBookURL} className="navigation__link">
                                <svg className="icon icon--book">
                                    <use xlinkHref="#icon--book" />
                                </svg>
                                <span className="navigation__text">Guestbook</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a
                                href="#contribute"
                                onClick={this.onClick}
                                onKeyDown={this.onKeyDown}
                                className={contributeClassNames}
                            >
                                <svg className="icon icon--heart">
                                    <use xlinkHref="#icon--heart" />
                                </svg>
                                <span className="navigation__text">Contribute</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a
                                href="#photos"
                                onClick={this.onClick}
                                onKeyDown={this.onKeyDown}
                                className="navigation__link"
                                id="navigation__item--photos"
                            >
                                <svg className="icon icon--photo">
                                    <use xlinkHref="#icon--photo" />
                                </svg>
                                <span className="navigation__text">Photos</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <span className={rightGradientClasses} />
            </div>
        );
    }
}

export default Navigation;