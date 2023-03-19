package com.blogapis.Services.Impl;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blogapis.Entities.Category;
import com.blogapis.Entities.Post;
import com.blogapis.Entities.User;
import com.blogapis.Exceptions.ResourseNotFoundException;
import com.blogapis.Payloads.PostDto;
import com.blogapis.Payloads.PostResponse;
import com.blogapis.Repositories.CategoryRepository;
import com.blogapis.Repositories.PostRepository;
import com.blogapis.Repositories.UserRepository;
import com.blogapis.Services.PostService;

@Service 
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	@Override
	public PostDto createPost(PostDto postDto,Integer userId,Integer categoryId) {
		
		
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourseNotFoundException("User","User Id",userId ));
		
		com.blogapis.Entities.Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourseNotFoundException("Category"," Id",categoryId ));
		
		Post post = this.modelMapper.map(postDto, Post.class);
		post.setImageName("default.jpg");
		post.setAddedDate(new Date());
		post.setUser(user);
		post.setCategory(category);
		
		Post newPost = this.postRepository.save(post);
		
		return this.modelMapper.map(newPost, PostDto.class);
	}

	@Override
	public PostDto UpdatePost(PostDto postDto, Integer postId) {
		
		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourseNotFoundException("Post","Post Id",postId ));

		Category category=this.categoryRepository.findById(postDto.getCategory().getCategoryId()).get();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		post.setCategory(category);
		
		Post updatePost = this.postRepository.save(post);
		return this.modelMapper.map(updatePost, PostDto.class);
		
	}

	@Override
	public void deletePost(Integer postId) {
		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourseNotFoundException("Post","Post Id",postId ));
		this.postRepository.delete(post);

	}

	
	// Get All post
	@Override
	public PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir) {
		
		
		Sort sort = null;
		if(sortDir.equalsIgnoreCase("asc")) {
			sort=Sort.by(sortBy).ascending();
		}else {
			sort=Sort.by(sortBy).descending();
		}
		
		Pageable p = PageRequest.of(pageNumber, pageSize,sort);
		Page<Post> pagePost = this.postRepository.findAll(p);
		List<Post> allPost = pagePost.getContent();
		List<PostDto> postDtos = allPost.stream().map((post)->this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		
		
		PostResponse postResponse = new PostResponse();
		
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		
		
		
		
		return postResponse;
	}

	
	//Get Single Post
	@Override
	public PostDto getPostById(Integer postId) {
		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourseNotFoundException("Post","Post Id",postId ));
		return this.modelMapper.map(post, PostDto.class);
	}
	
	

	@Override
	public List<PostDto> getPostsByCategory(Integer categoryId) {
		
	Category cat= this.categoryRepository.findById(categoryId)
			.orElseThrow(() -> new ResourseNotFoundException("Category","Category Id",categoryId ));
	
	List<Post> posts = this.postRepository.findByCategory(cat);
	
	List<PostDto> collect = posts.stream().map((post)->this.modelMapper.map(post, PostDto.class))
			.collect(Collectors.toList());
	
		return collect;
	}

	
	
	@Override
	public List<PostDto> getPostsByUser(Integer userId) {
		
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourseNotFoundException("User","User Id",userId ));
		
		List<Post> posts = this.postRepository.findByUser(user);
		
		List<PostDto> postDtos = posts.stream().map((post)->this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		
		return postDtos;
	}

	
	
	@Override
	public List<PostDto> searchPost(String keyword) {
		List<Post>posts =  this.postRepository.searchByTitle("%"+keyword+"%");
		List<PostDto> postDtos = posts.stream().map((post)->this.modelMapper.map(post, PostDto.class))
			.collect(Collectors.toList());
		
		return postDtos;
	}

	
	
}
