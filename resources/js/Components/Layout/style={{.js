style={{
                                            // isOpenがtrueになった瞬間からindexに応じて遅れてフワッと出現
                                            opacity: isOpen ? 1 : 0,
                                            transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                                            transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
                                        }}