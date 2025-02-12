test('Home displays 3 recent articles', () => {
    render(<Home />);
    
    const articles = screen.getAllByTestId('article');
    expect(articles.length).toBe(3);
  });
  
  test('See more articles button redirects to Articles', () => {
    render(<Home />);
    
    const seeMoreButton = screen.getByText('Voir plus d\'articles');
    fireEvent.click(seeMoreButton);
  
    expect(window.location.pathname).toBe('/articles');
  });