'use client';
import '@/assets/css/carousel.css';
import {page, scrollTo, viewportListener} from 'utils/pages';
import {list, url} from 'utils/strings';
import {useState, useEffect} from 'react';
import {Gallery} from 'components/gallery';
import {Grid, Section, Content, Divider, Wrapper, Loading, Container, ContentDefault} from 'components/layout';

export default function Main() {

    const [isMobile, setisMobile] = useState( false )
        , [isLoading, setIsLoading] = useState( true )
        , socials = {
            instagram: "https://www.instagram.com/mangocafesjc/",
            facebook: "https://www.facebook.com/profile.php?id=61558132046582",
            whatsapp: "https://wa.me/5512997828401"
        };

    function Title( {name, price, className} ) {
        var value = price?.split( "," );
        return (
            <h3 className={list( 'mango-neon-orange font-semibold text-xl', className )}>
                {name}
                {value && <span> - {value[0]}<sup><small>,{value[1]}</small></sup></span>}
            </h3>
        );
    }

    useEffect( () => {
        const listener = viewportListener( setisMobile );
        page( "Mango Café" );
        listener.add();
        setIsLoading( false );
        return listener.remove;
    }, [] );

    return (
        <main>
            {isLoading && <Loading />}

            <Section id='header' className='shadow-md pb-0 min-[821px]:!pt-0 max-[820px]:after:bg-bottom-right max-[820px]:pt-8'>
                <Content className='relative z-10 h-full '>
                    {!isMobile && <div className='w-screen bg-opacity-80 px-8 py-4 flex justify-end'>
                        <Wrapper className='text-white items-center text-center'>
                            <a href={socials.instagram} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href={socials.facebook} className='mx-2 hover:text-[var(--mango-ocean-blue)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href={socials.whatsapp} className='mx-2 hover:text-[var(--mango-neon-green)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                            </a>
                        </Wrapper>
                    </div>}
                    {!isMobile && <div className='w-screen bg-slate-900 bg-opacity-80 px-8 py-4 flex justify-between'>
                        <Wrapper className='items-center'>
                            <img src="/img/svg/mascot.svg" alt="" draggable="false" className='w-8 mr-4' />
                            <Container>
                                <h1 className='astron mango-neon-orange'>MANGO</h1>
                                <h6 className='astron mango-neon-orange text-xs'>CAFÉ</h6>
                            </Container>
                        </Wrapper>
                        <Wrapper className='text-white text-xs items-center'>
                            <span className='mr-4 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out'
                                onClick={() => scrollTo( '#header' )}>HOME</span>
                            <span className='mr-4 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out'
                                onClick={() => scrollTo( '#sobre' )}>SOBRE O MANGO</span>
                            <span className='mr-4 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out'
                                onClick={() => scrollTo( '#festival' )}>FESTIVAL OMAKASE</span>
                            <span className='mr-4 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out'
                                onClick={() => scrollTo( '#drinks' )}>DRINKS</span>
                            <span className='mr-4 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out'
                                onClick={() => scrollTo( '#cardapio' )}>CARDÁPIO</span>
                        </Wrapper>
                    </div>}
                    <ContentDefault className='py-16'>
                        <Container className='items-center'>
                            <div className="flex items-center">
                                <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 w-24' />
                                <img src="/img/svg/mascot.svg" alt="" draggable='false' className='w-20 mx-4' />
                                <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 -scale-x-100 w-24' />
                            </div>
                            <img src="/img/svg/logo.svg" alt="" draggable='false' className='w-64 my-4' />
                            <span className='mango-neon-orange astron'>CAFÉ</span>
                        </Container>
                        <Divider className='my-8 w-1/2 mx-auto' />
                        <p className='max-w-[480px] mx-auto text-white text-center'>
                            O Mango Café é uma fusão de diversas culturas da Ásia, reunidas em um ambiente aconchegante e divertido. <br />
                            Venha viver essa experiência multicultural acompanhada de música ao vivo e sabores inesquecíveis.
                        </p>
                    </ContentDefault>
                </Content>
            </Section>

            <Section id='sobre' className='py-8 bg-[radial-gradient(circle_at_center,var(--mango-tropical-maroon),rgb(2,6,23))]'>
                <Content>
                    <ContentDefault>
                        <Grid className='p-4 grid-cols-3 max-[820px]:grid-cols-1 gap-4 w-full'>
                            <Container className='bg-slate-950 bg-opacity-50 rounded-md text-white text-center w-full items-center h-[22rem] relative select-none shadow-xl'>
                                <div className='p-8 h-full'>
                                    <div className='p-2 rounded-md border border-white w-12 h-12 mb-4 mx-auto'>
                                        <i className='fa-solid fa-utensils align-bottom' aria-hidden="true"></i>
                                    </div>
                                    <h1 className="astron text-white mb-4">Restaurante</h1>
                                    <p className='font-light'>Nosso cardápio oferece uma experiência gastronômica multicultural. Ingredientes de qualidade escolhidos a dedo para garantir a sua satisfação.</p>
                                </div>
                                <a
                                    className='flex items-center justify-center w-full h-16 bg-[var(--mango-tropical-maroon)] font-extralight cursor-pointer hover:bg-[var(--mango-neon-purple)] duration-150 ease-out rounded-bl-md rounded-br-md'
                                    onClick={() => scrollTo( '#cardapio' )}
                                >
                                    <p>CONFIRA NOSSO CARDÁPIO</p>
                                </a>
                            </Container>

                            <Container className='bg-slate-950 bg-opacity-50 rounded-md text-white text-center w-full items-center h-[22rem] relative select-none shadow-xl'>
                                <div className='p-8 h-full'>
                                    <div className='p-2 rounded-md border border-white w-12 h-12 mb-4 mx-auto'>
                                        <i className='fa-solid fa-martini-glass-citrus align-bottom' aria-hidden="true"></i>
                                    </div>
                                    <h1 className="astron text-white mb-4">Bar</h1>
                                    <p className='font-light'>Venha experimentar nossos drinks originais inspirados pelos sabores da Ásia tropical.</p>
                                </div>
                                <a
                                    className='flex items-center justify-center w-full h-16 bg-[var(--mango-tropical-maroon)] font-extralight cursor-pointer hover:bg-[var(--mango-neon-pink)] duration-150 ease-out rounded-bl-md rounded-br-md'
                                    onClick={() => scrollTo( '#drinks' )}
                                >
                                    <p>CONFIRA NOSSOS DRINKS</p>
                                </a>
                            </Container>

                            <Container className='bg-slate-950 bg-opacity-50 rounded-md text-white text-center w-full items-center h-[22rem] relative select-none shadow-xl'>
                                <div className='p-8 h-full'>
                                    <div className='p-2 rounded-md border border-white w-12 h-12 mb-4 mx-auto'>
                                        <i className='fa-solid fa-music align-bottom' aria-hidden="true"></i>
                                    </div>
                                    <h1 className="astron text-white mb-4">NIGHT CLUB</h1>
                                    <p className='font-light'>As noites no mango contam com a presença de DJs de diversos repertórios, incluindo house, trance, vogue e vertentes do mundo afora.</p>
                                </div>
                                <a href={socials.instagram} className='flex items-center justify-center w-full h-16 bg-[var(--mango-tropical-maroon)] font-extralight cursor-pointer hover:bg-[var(--mango-neon-orange)] duration-150 ease-out rounded-bl-md rounded-br-md'>
                                    <p>SIGA NOSSO INSTAGRAM</p>
                                </a>
                            </Container>
                        </Grid>
                    </ContentDefault>
                </Content>
            </Section>

            <Section id='drinks'>
                <Content className='relative z-[5]'>
                    <ContentDefault>
                        <Container className='text-center'>
                            <h1 className='font-bold astron golden text-2xl'>DRINKS</h1>
                            <Divider className='my-4' color='#f1e49a, #cf9f45, #956c1d' />
                            <Container>
                                <Grid className='py-8 grid-cols-3 max-[820px]:!grid-cols-1 gap-4'>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Mango Fresh</h1>
                                            <p className='text-sm font-light'>Curaçao Blue, Vodka Smirnoff, leite condensado, limão espremido, bala Halls azul e gelo.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url()}}></div>
                                        </Container>
                                    </Grid>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Ganbatte</h1>
                                            <p className='text-sm font-light'>Soju, xarope de amarena, licor fino, suco de limão siciliano e espuma de yuzu.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url()}}></div>
                                        </Container>
                                    </Grid>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Passion</h1>
                                            <p className='text-sm font-light'>Whisky Johnny Walker Blonde, maracujá, xarope rico de açúcar demerara com infusão de canela, suco de limão tahiti e gelo.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url()}}></div>
                                        </Container>
                                    </Grid>
                                </Grid>
                                <Grid className='py-8 grid-cols-3 max-[820px]:!grid-cols-1 gap-4'>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Margarita</h1>
                                            <p className='text-sm font-light'>Tequila José Cuervo Prata, licor fino, suco de limão tahiti e gelo, servido em uma taça com crosta de sal.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url( 'img/drinks/margarita.webp' )}}></div>
                                        </Container>
                                    </Grid>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Pisco Sour</h1>
                                            <p className='text-sm font-light'>Pisco capel, suco de limão tahiti, xarope de açúcar demerara, bitter floral e cubos de gelo.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url( 'img/drinks/pisco_sour.webp' )}}></div>
                                        </Container>
                                    </Grid>
                                    <Grid className='grid-cols-2 text-left max-[820px]:!text-center w-[32rem] max-[820px]:!w-full gap-4 max-[820px]:!grid-cols-1'>
                                        <Container>
                                            <h1 className="vidaloka !text-2xl mb-2 tracking-wider">Boulevardier</h1>
                                            <p className='text-sm font-light'>Campari, Jack Daniels, Vermute Cinzano, Bitter floral e cubos de gelo.</p>
                                        </Container>
                                        <Container className='justify-center max-[820px]:!items-center max-[820px]:!order-first'>
                                            <div className='rounded-full shadow-lg w-1/2 max-[820px]:!w-32 aspect-square bg-center bg-cover' style={{backgroundImage: url( 'img/drinks/boulevardier.webp' )}}></div>
                                        </Container>
                                    </Grid>
                                </Grid>
                            </Container>

                            <Container className='mt-8'>
                                <a
                                    href='/carta-drinks.pdf'
                                    target='_blank'
                                    className='font-bold golden-small rounded-full border border-yellow-200 px-4 py-2 mx-auto hover:brightness-150 duration-200 ease-out'
                                >
                                    Abra nossa carta de drinks <i className='fa-solid fa-external-link' aria-hidden="true"></i>
                                </a>
                            </Container>
                        </Container>
                    </ContentDefault>
                </Content>
            </Section>

            <Section id='festival'>
                <Content className='relative z-10'>
                    <ContentDefault>
                        <div className="flex items-center justify-center">
                            <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 w-24' />
                            <img src="/img/svg/mascot.svg" alt="" draggable='false' className='w-20 mx-4' />
                            <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 -scale-x-100 w-24' />
                        </div>
                        <h1 className='astron mango-neon-orange text-center my-4'>FESTIVAL<br />OMAKASE</h1>
                        <Wrapper className='max-[820px]:text-center items-center'>
                            <Container className="w-96 max-[820px]:w-full max-[820px]:mb-4">
                                <p className='mb-4 text-white'>
                                    O Festival Omakase é uma sequência em 9 etapas de degustação de diversos itens do nosso cardápio, cudadosamente selecionados de acordo com o clima e a sazonalidade.
                                    Ao fim da sequência você pode escolher os itens que quiser repetir!
                                </p>
                                <p className='max-[820px]:hidden text-xs italic text-white'>Para a sua segurança e bem-estar, caso tenha alergias ou restrições alimentares, favor avisar nossa equipe. O Mango agradece sua colaboração!</p>
                            </Container>
                            <Gallery className='grow justify-center items-center max-[820px]:grow-0 max-[820px]:w-full' isMobile={isMobile}>
                                <img src='/img/festival/festival_1.webp' className='w-96 h-96' />
                                <div className="w-96 h-96 grid grid-cols-2 grid-rows-2 gap-2 m-2 max-[820px]:mx-0">
                                    <img src='/img/festival/festival_2.webp' className='w-full h-full' />
                                    <img src='/img/festival/festival_3.webp' className='w-full h-full' />
                                    <img src='/img/festival/festival_4.webp' className='w-full h-full' />
                                    <img src='/img/festival/festival_5.webp' className='w-full h-full' />
                                </div>
                            </Gallery>
                            <Container className='min-[821px]:hidden w-full my-4'>
                                <p className='text-xs italic text-white'>Para a sua segurança e bem-estar, caso tenha alergias ou restrições alimentares, favor avisar nossa equipe. O Mango agradece sua colaboração!</p>
                            </Container>
                        </Wrapper>
                        <Container className='mt-8'>
                            <a
                                href={socials.instagram}
                                target='_blank'
                                rel='noreferrer'
                                className='font-bold mango-neon-orange rounded-full border-2 border-[color:var(--mango-neon-orange)] px-4 py-2 mx-auto hover:border-[color:var(--mango-neon-purple)] hover:text-[var(--mango-neon-purple)] duration-200 ease-out'
                            >
                                Veja mais no nosso Instagram <i className='fa-solid fa-external-link' aria-hidden="true"></i>
                            </a>
                        </Container>
                    </ContentDefault>
                </Content>
            </Section>

            <Section id='cardapio' className='bg-[var(--mango-tropical-maroon)] overflow-hidden'>
                <Content>
                    <ContentDefault className='relative z-[2]'>
                        <Container className='text-center'>
                            <div className="flex items-center justify-center">
                                <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 w-12 mb-2' />
                                <h1 className='astron mango-neon-orange mx-4 text-xl'>CARDÁPIO</h1>
                                <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 -scale-x-100 w-12 mb-2' />
                            </div>
                            <Divider className='my-2' />
                        </Container>
                        <Grid className='grid-cols-3 max-[820px]:!grid-cols-1 gap-4 my-4'>

                            <div className="w-full p-8 rounded-lg bg-slate-900 bg-opacity-75 border border-slate-700 shadow-lg backdrop-blur-md flex flex-col justify-evenly">

                                <div className='mb-4'>
                                    <span className='mango-neon-orange text-xl mb-8 font-semibold'>COMBINADOS</span>
                                    <p>Peças variadas de harumaki, joe, nigiri, hossomaki, sashimi e hot roll. Tudo isso naquele jeitinho brasileiro que deixa tudo mais gostoso.</p>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <Title name="JUU" />
                                        <p>15 peças</p>
                                        <Title name="NI-JUU" />
                                        <p>25 peças</p>
                                        <Title name="SAN-JUU" />
                                        <p>50 peças</p>
                                    </div>
                                    <img src="/img/pratos/combinados.webp" alt="" width={150} height={150} />
                                </div>
                            </div>

                            <div className="w-full p-8 rounded-lg bg-slate-900 bg-opacity-75 border border-slate-700 shadow-lg backdrop-blur-md flex flex-col justify-evenly">
                                <div className="menu-item grid grid-cols-[70%_30%] gap-2">
                                    <div>
                                        <Title name="SALMÃO TARTARE" />
                                        <p>Cubos de salmão fresco sobre uma cama de avocado temperado, cobertos de tobiko.</p>
                                    </div>
                                    <img src="/img/pratos/tartare.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                                </div>

                                <div className="menu-item grid grid-cols-[30%_70%] gap-2">
                                    <img src="/img/pratos/ceviche.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                                    <div>
                                        <Title name="CEVICHE" />
                                        <p>Pescada branca, lula, camarão e polvo, cozidos na acidez do suco de limão.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-8 rounded-lg bg-slate-900 bg-opacity-75 border border-slate-700 shadow-lg backdrop-blur-md flex flex-col justify-between">
                                <Title name="HOT ROLL" />
                                <p>5 peças de hot roll - sushi empanado e frito que costuma agradar quem não curte sushi. O recheio fica à sua escolha:</p>
                                <div className="flex justify-between">
                                    <ul className='list-disc pl-4 my-auto'>
                                        <li>Atum</li>
                                        <li>Salmão</li>
                                        <li>Camarão</li>
                                    </ul>
                                    <img src="/img/pratos/hot_roll.webp" alt="" width={150} height={150} className='m-2' />
                                </div>
                            </div>

                        </Grid>

                        <Container className='mt-8'>
                            <a
                                href={isMobile ? '/menu' : '/menu/cardapio-mango.pdf'}
                                target='_blank'
                                rel='noreferrer'
                                className='font-bold mango-neon-orange rounded-full border-2 border-[color:var(--mango-neon-orange)] px-4 py-2 mx-auto hover:border-[color:var(--mango-neon-pink)] hover:text-[var(--mango-neon-pink)] duration-200 ease-out'
                            >
                                Veja nosso cardápio completo <i className='fa-solid fa-external-link' aria-hidden="true"></i>
                            </a>
                        </Container>
                    </ContentDefault>
                </Content>
            </Section>

            <Section id='footer' className='bg-slate-950'>
                <Content>
                    <ContentDefault>
                        <Container className='mx-auto items-center'>
                            <img src="/img/svg/mascot.svg" alt="" draggable="false" className='w-12 mb-2' />
                            <img src="/img/svg/logo.svg" alt="" draggable="false" className='w-36' />
                            <Wrapper className='text-white text-2xl items-center text-center my-4'>
                                <a href={socials.instagram} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                                </a>
                                <a href={socials.facebook} className='mx-2 hover:text-[var(--mango-ocean-blue)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                    <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a href={socials.whatsapp} className='mx-2 hover:text-[var(--mango-neon-green)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                                </a>
                            </Wrapper>
                            <Container className='text-center'>
                                <p className='text-white text-xs font-extralight'>2024 Mango Café</p>
                                <p className='text-white text-xs font-extralight'>Av. Anchieta 509, São José dos Campos - SP</p>
                            </Container>
                        </Container>
                    </ContentDefault>
                </Content>
            </Section>
        </main>
    );
}